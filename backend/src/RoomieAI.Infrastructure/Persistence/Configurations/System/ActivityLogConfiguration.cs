using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoomieAI.Domain.Entities.System;
using RoomieAI.Infrastructure.Persistence.Configurations.Common;

namespace RoomieAI.Infrastructure.Persistence.Configurations.System;

public class ActivityLogConfiguration : IEntityTypeConfiguration<ActivityLog>
{
    public void Configure(EntityTypeBuilder<ActivityLog> builder)
    {
        builder.ToTable("ActivityLogs", "system");
        builder.ConfigureBaseEntity();

        builder.Property(a => a.ActivityType).HasMaxLength(100).IsRequired();
        builder.Property(a => a.Summary).HasMaxLength(500).IsRequired();
        builder.Property(a => a.MetadataJson).HasColumnType("nvarchar(max)");

        builder.HasIndex(a => new { a.FlatId, a.OccurredAt });

        builder.HasOne(a => a.Flat)
            .WithMany(f => f.ActivityLogs)
            .HasForeignKey(a => a.FlatId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(a => a.ActorUser)
            .WithMany()
            .HasForeignKey(a => a.ActorUserId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
