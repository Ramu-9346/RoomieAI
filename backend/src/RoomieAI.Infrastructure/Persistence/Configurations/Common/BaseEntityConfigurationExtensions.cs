using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoomieAI.Domain.Common;

namespace RoomieAI.Infrastructure.Persistence.Configurations.Common;

/// <summary>
/// Shared Fluent API conventions applied by every entity configuration: primary key,
/// concurrency token, and audit-stamp columns. Keeps the 36 per-entity configuration
/// classes focused on what's actually specific to each entity.
/// </summary>
public static class BaseEntityConfigurationExtensions
{
    public static void ConfigureBaseEntity<TEntity>(this EntityTypeBuilder<TEntity> builder)
        where TEntity : BaseEntity
    {
        builder.HasKey(e => e.Id);

        builder.Property(e => e.Id)
            .ValueGeneratedNever();

        builder.Property(e => e.CreatedAt)
            .IsRequired();

        builder.Property(e => e.RowVersion)
            .IsRowVersion();

        builder.HasIndex(e => e.IsDeleted);
    }
}
