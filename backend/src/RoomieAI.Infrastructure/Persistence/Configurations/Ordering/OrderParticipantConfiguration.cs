using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoomieAI.Domain.Entities.Ordering;
using RoomieAI.Infrastructure.Persistence.Configurations.Common;

namespace RoomieAI.Infrastructure.Persistence.Configurations.Ordering;

public class OrderParticipantConfiguration : IEntityTypeConfiguration<OrderParticipant>
{
    public void Configure(EntityTypeBuilder<OrderParticipant> builder)
    {
        builder.ToTable("OrderParticipants", "ordering");
        builder.ConfigureBaseEntity();

        builder.Property(p => p.Status).HasConversion<string>().HasMaxLength(20);
        builder.Property(p => p.CollectionStatus).HasConversion<string>().HasMaxLength(20);
        builder.Property(p => p.ContributionCapRupees).HasPrecision(10, 2);

        builder.HasIndex(p => new { p.OrderId, p.FlatMemberId }).IsUnique();

        builder.HasOne(p => p.Order)
            .WithMany(o => o.Participants)
            .HasForeignKey(p => p.OrderId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(p => p.FlatMember)
            .WithMany()
            .HasForeignKey(p => p.FlatMemberId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
