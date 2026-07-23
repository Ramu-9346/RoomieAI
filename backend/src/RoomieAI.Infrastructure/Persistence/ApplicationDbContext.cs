using System.Reflection;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RoomieAI.Domain.Common;
using RoomieAI.Domain.Entities.AI;
using RoomieAI.Domain.Entities.Expenses;
using RoomieAI.Domain.Entities.Flats;
using RoomieAI.Domain.Entities.Grocery;
using RoomieAI.Domain.Entities.Identity;
using RoomieAI.Domain.Entities.Integration;
using RoomieAI.Domain.Entities.Notifications;
using RoomieAI.Domain.Entities.Ordering;
using RoomieAI.Domain.Entities.Polls;
using RoomieAI.Domain.Entities.System;
using RoomieAI.Infrastructure.Persistence.Events;

namespace RoomieAI.Infrastructure.Persistence;

/// <summary>
/// The single EF Core context for the RoomieAI backend. Entity configurations live
/// as one <c>IEntityTypeConfiguration&lt;T&gt;</c> class per entity under
/// <c>Persistence/Configurations</c> and are discovered via assembly scan —
/// nothing is configured inline here.
/// </summary>
public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IPublisher publisher)
    : DbContext(options)
{
    private static readonly Type[] SoftDeleteExemptTypes = [typeof(AuditLog), typeof(SwiggyWebhookEvent)];

    // ── Identity ─────────────────────────────────────────────────────────────
    public DbSet<User> Users => Set<User>();
    public DbSet<UserDevice> UserDevices => Set<UserDevice>();
    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();
    public DbSet<UserPreference> UserPreferences => Set<UserPreference>();

    // ── Flat ─────────────────────────────────────────────────────────────────
    public DbSet<Flat> Flats => Set<Flat>();
    public DbSet<FlatMember> FlatMembers => Set<FlatMember>();
    public DbSet<Invitation> Invitations => Set<Invitation>();

    // ── Ordering ─────────────────────────────────────────────────────────────
    public DbSet<Restaurant> Restaurants => Set<Restaurant>();
    public DbSet<MenuCategory> MenuCategories => Set<MenuCategory>();
    public DbSet<MenuItem> MenuItems => Set<MenuItem>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderParticipant> OrderParticipants => Set<OrderParticipant>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();
    public DbSet<OrderStatusHistory> OrderStatusHistories => Set<OrderStatusHistory>();

    // ── Grocery ──────────────────────────────────────────────────────────────
    public DbSet<Pantry> Pantries => Set<Pantry>();
    public DbSet<PantryItem> PantryItems => Set<PantryItem>();
    public DbSet<GroceryList> GroceryLists => Set<GroceryList>();
    public DbSet<GroceryListItem> GroceryListItems => Set<GroceryListItem>();

    // ── Expense ──────────────────────────────────────────────────────────────
    public DbSet<Expense> Expenses => Set<Expense>();
    public DbSet<ExpenseSplit> ExpenseSplits => Set<ExpenseSplit>();
    public DbSet<Settlement> Settlements => Set<Settlement>();
    public DbSet<SettlementExpenseSplit> SettlementExpenseSplits => Set<SettlementExpenseSplit>();

    // ── Poll ─────────────────────────────────────────────────────────────────
    public DbSet<Poll> Polls => Set<Poll>();
    public DbSet<PollOption> PollOptions => Set<PollOption>();
    public DbSet<Vote> Votes => Set<Vote>();

    // ── AI ───────────────────────────────────────────────────────────────────
    public DbSet<AIConversation> AIConversations => Set<AIConversation>();
    public DbSet<AIMessage> AIMessages => Set<AIMessage>();
    public DbSet<AIAction> AIActions => Set<AIAction>();
    public DbSet<AIRecommendation> AIRecommendations => Set<AIRecommendation>();

    // ── Notification ─────────────────────────────────────────────────────────
    public DbSet<Notification> Notifications => Set<Notification>();

    // ── System ───────────────────────────────────────────────────────────────
    public DbSet<ActivityLog> ActivityLogs => Set<ActivityLog>();
    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();
    public DbSet<FeatureFlag> FeatureFlags => Set<FeatureFlag>();
    public DbSet<AppSetting> AppSettings => Set<AppSetting>();

    // ── Integration ──────────────────────────────────────────────────────────
    public DbSet<SwiggyAccountLink> SwiggyAccountLinks => Set<SwiggyAccountLink>();
    public DbSet<SwiggyWebhookEvent> SwiggyWebhookEvents => Set<SwiggyWebhookEvent>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            if (!typeof(BaseEntity).IsAssignableFrom(entityType.ClrType))
            {
                continue;
            }

            if (SoftDeleteExemptTypes.Contains(entityType.ClrType))
            {
                continue;
            }

            var method = typeof(ApplicationDbContext)
                .GetMethod(nameof(ApplySoftDeleteFilter), BindingFlags.NonPublic | BindingFlags.Static)!
                .MakeGenericMethod(entityType.ClrType);

            method.Invoke(null, [modelBuilder]);
        }
    }

    private static void ApplySoftDeleteFilter<TEntity>(ModelBuilder modelBuilder)
        where TEntity : BaseEntity
    {
        modelBuilder.Entity<TEntity>().HasQueryFilter(e => !e.IsDeleted);
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        StampAuditFields();

        var domainEvents = CollectDomainEvents();

        var result = await base.SaveChangesAsync(cancellationToken);

        await DispatchDomainEventsAsync(domainEvents, cancellationToken);

        return result;
    }

    private void StampAuditFields()
    {
        var now = DateTime.UtcNow;

        foreach (var entry in ChangeTracker.Entries<BaseEntity>())
        {
            switch (entry.State)
            {
                case EntityState.Added:
                    entry.Entity.CreatedAt = now;
                    break;
                case EntityState.Modified:
                    entry.Entity.UpdatedAt = now;
                    break;
            }
        }
    }

    private List<Domain.Events.IDomainEvent> CollectDomainEvents()
    {
        var entitiesWithEvents = ChangeTracker.Entries<BaseEntity>()
            .Select(e => e.Entity)
            .Where(e => e.DomainEvents.Count > 0)
            .ToList();

        var domainEvents = entitiesWithEvents
            .SelectMany(e => e.DomainEvents)
            .ToList();

        entitiesWithEvents.ForEach(e => e.ClearDomainEvents());

        return domainEvents;
    }

    private async Task DispatchDomainEventsAsync(
        IEnumerable<Domain.Events.IDomainEvent> domainEvents,
        CancellationToken cancellationToken)
    {
        foreach (var domainEvent in domainEvents)
        {
            var notificationType = typeof(DomainEventNotification<>).MakeGenericType(domainEvent.GetType());
            var notification = (INotification)Activator.CreateInstance(notificationType, domainEvent)!;
            await publisher.Publish(notification, cancellationToken);
        }
    }
}
