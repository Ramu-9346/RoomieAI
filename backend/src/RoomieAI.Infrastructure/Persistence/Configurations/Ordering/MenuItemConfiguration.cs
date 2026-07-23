using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoomieAI.Domain.Entities.Ordering;
using RoomieAI.Infrastructure.Persistence.Configurations.Common;

namespace RoomieAI.Infrastructure.Persistence.Configurations.Ordering;

public class MenuItemConfiguration : IEntityTypeConfiguration<MenuItem>
{
    public void Configure(EntityTypeBuilder<MenuItem> builder)
    {
        builder.ToTable("MenuItems", "ordering");
        builder.ConfigureBaseEntity();

        builder.Property(i => i.SwiggyItemId).HasMaxLength(100).IsRequired();
        builder.Property(i => i.Name).HasMaxLength(200).IsRequired();
        builder.Property(i => i.Description).HasMaxLength(1000);
        builder.Property(i => i.PriceRupees).HasPrecision(10, 2);
        builder.Property(i => i.ImageUrl).HasMaxLength(2048);

        builder.HasIndex(i => i.SwiggyItemId).IsUnique();

        // Restrict, not Cascade: Restaurant already cascades to MenuCategory, and
        // MenuCategory cascades (SetNull) to MenuItem — a second direct cascade
        // path from Restaurant would create a multi-path cycle SQL Server rejects.
        builder.HasOne(i => i.Restaurant)
            .WithMany(r => r.MenuItems)
            .HasForeignKey(i => i.RestaurantId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(i => i.MenuCategory)
            .WithMany(c => c.Items)
            .HasForeignKey(i => i.MenuCategoryId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
