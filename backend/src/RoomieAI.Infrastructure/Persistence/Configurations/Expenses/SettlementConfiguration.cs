using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoomieAI.Domain.Entities.Expenses;
using RoomieAI.Infrastructure.Persistence.Configurations.Common;

namespace RoomieAI.Infrastructure.Persistence.Configurations.Expenses;

public class SettlementConfiguration : IEntityTypeConfiguration<Settlement>
{
    public void Configure(EntityTypeBuilder<Settlement> builder)
    {
        builder.ToTable("Settlements", "expense");
        builder.ConfigureBaseEntity();

        builder.Property(s => s.AmountRupees).HasPrecision(10, 2);
        builder.Property(s => s.Status).HasConversion<string>().HasMaxLength(20);

        builder.HasIndex(s => s.FlatId);

        builder.HasOne(s => s.Flat)
            .WithMany(f => f.Settlements)
            .HasForeignKey(s => s.FlatId)
            .OnDelete(DeleteBehavior.Restrict);

        // Two FKs to the same table (FlatMember) — both must be Restrict/NoAction
        // to avoid SQL Server's multiple-cascade-path error.
        builder.HasOne(s => s.FromMember)
            .WithMany()
            .HasForeignKey(s => s.FromFlatMemberId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(s => s.ToMember)
            .WithMany()
            .HasForeignKey(s => s.ToFlatMemberId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
