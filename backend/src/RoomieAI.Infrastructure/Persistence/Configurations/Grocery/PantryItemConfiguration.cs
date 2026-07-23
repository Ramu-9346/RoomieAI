using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoomieAI.Domain.Entities.Grocery;
using RoomieAI.Infrastructure.Persistence.Configurations.Common;

namespace RoomieAI.Infrastructure.Persistence.Configurations.Grocery;

public class PantryItemConfiguration : IEntityTypeConfiguration<PantryItem>
{
    public void Configure(EntityTypeBuilder<PantryItem> builder)
    {
        builder.ToTable("PantryItems", "grocery");
        builder.ConfigureBaseEntity();

        builder.Property(i => i.Name).HasMaxLength(150).IsRequired();
        builder.Property(i => i.Category).HasMaxLength(50);
        builder.Property(i => i.Unit).HasMaxLength(20).IsRequired();
        builder.Property(i => i.CurrentQuantity).HasPrecision(10, 2);
        builder.Property(i => i.LowStockThreshold).HasPrecision(10, 2);
        builder.Property(i => i.StockLevel).HasConversion<string>().HasMaxLength(20);

        builder.HasIndex(i => new { i.PantryId, i.StockLevel });

        builder.HasOne(i => i.Pantry)
            .WithMany(p => p.Items)
            .HasForeignKey(i => i.PantryId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
