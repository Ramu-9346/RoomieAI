using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoomieAI.Domain.Entities.Expenses;
using RoomieAI.Infrastructure.Persistence.Configurations.Common;

namespace RoomieAI.Infrastructure.Persistence.Configurations.Expenses;

public class SettlementExpenseSplitConfiguration : IEntityTypeConfiguration<SettlementExpenseSplit>
{
    public void Configure(EntityTypeBuilder<SettlementExpenseSplit> builder)
    {
        builder.ToTable("SettlementExpenseSplits", "expense");
        builder.ConfigureBaseEntity();

        builder.HasIndex(x => new { x.SettlementId, x.ExpenseSplitId }).IsUnique();

        builder.HasOne(x => x.Settlement)
            .WithMany(s => s.ExpenseSplits)
            .HasForeignKey(x => x.SettlementId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.ExpenseSplit)
            .WithMany()
            .HasForeignKey(x => x.ExpenseSplitId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
