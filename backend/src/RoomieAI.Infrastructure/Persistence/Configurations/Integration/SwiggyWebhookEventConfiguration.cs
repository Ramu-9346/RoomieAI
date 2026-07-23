using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoomieAI.Domain.Entities.Integration;
using RoomieAI.Infrastructure.Persistence.Configurations.Common;

namespace RoomieAI.Infrastructure.Persistence.Configurations.Integration;

/// <summary>
/// Append-only inbound event log — exempted from the global soft-delete query
/// filter in <see cref="Persistence.ApplicationDbContext"/>.
/// </summary>
public class SwiggyWebhookEventConfiguration : IEntityTypeConfiguration<SwiggyWebhookEvent>
{
    public void Configure(EntityTypeBuilder<SwiggyWebhookEvent> builder)
    {
        builder.ToTable("SwiggyWebhookEvents", "integration");
        builder.ConfigureBaseEntity();

        builder.Property(e => e.ExternalEventId).HasMaxLength(200).IsRequired();
        builder.Property(e => e.EventType).HasMaxLength(100).IsRequired();
        builder.Property(e => e.RawPayloadJson).HasColumnType("nvarchar(max)").IsRequired();

        // Idempotency key — Swiggy delivers at-least-once.
        builder.HasIndex(e => e.ExternalEventId).IsUnique();

        builder.HasOne(e => e.SwiggyAccountLink)
            .WithMany(l => l.WebhookEvents)
            .HasForeignKey(e => e.SwiggyAccountLinkId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(e => e.RelatedOrder)
            .WithMany()
            .HasForeignKey(e => e.RelatedOrderId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
