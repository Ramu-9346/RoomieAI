using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoomieAI.Domain.Entities.Expenses;
using RoomieAI.Infrastructure.Persistence.Configurations.Common;

namespace RoomieAI.Infrastructure.Persistence.Configurations.Expenses;

public class ExpenseSplitConfiguration : IEntityTypeConfiguration<ExpenseSplit>
{
    public void Configure(EntityTypeBuilder<ExpenseSplit> builder)
    {
        builder.ToTable("ExpenseSplits", "expense");
        builder.ConfigureBaseEntity();

        builder.Property(s => s.ShareAmountRupees).HasPrecision(10, 2);

        builder.HasIndex(s => new { s.ExpenseId, s.FlatMemberId }).IsUnique();

        builder.HasOne(s => s.Expense)
            .WithMany(e => e.Splits)
            .HasForeignKey(s => s.ExpenseId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(s => s.FlatMember)
            .WithMany()
            .HasForeignKey(s => s.FlatMemberId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
