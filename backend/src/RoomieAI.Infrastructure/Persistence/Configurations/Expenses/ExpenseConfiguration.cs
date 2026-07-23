using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoomieAI.Domain.Entities.Expenses;
using RoomieAI.Infrastructure.Persistence.Configurations.Common;

namespace RoomieAI.Infrastructure.Persistence.Configurations.Expenses;

public class ExpenseConfiguration : IEntityTypeConfiguration<Expense>
{
    public void Configure(EntityTypeBuilder<Expense> builder)
    {
        builder.ToTable("Expenses", "expense");
        builder.ConfigureBaseEntity();

        builder.Property(e => e.Description).HasMaxLength(200).IsRequired();
        builder.Property(e => e.AmountRupees).HasPrecision(10, 2);
        builder.Property(e => e.Category).HasConversion<string>().HasMaxLength(20);
        builder.Property(e => e.SplitType).HasConversion<string>().HasMaxLength(20);

        builder.HasIndex(e => new { e.FlatId, e.IncurredAt });

        builder.HasOne(e => e.Flat)
            .WithMany(f => f.Expenses)
            .HasForeignKey(e => e.FlatId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(e => e.PaidByUser)
            .WithMany()
            .HasForeignKey(e => e.PaidByUserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(e => e.SourceOrder)
            .WithMany()
            .HasForeignKey(e => e.SourceOrderId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
