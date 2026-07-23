using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoomieAI.Domain.Entities.Grocery;
using RoomieAI.Infrastructure.Persistence.Configurations.Common;

namespace RoomieAI.Infrastructure.Persistence.Configurations.Grocery;

public class GroceryListItemConfiguration : IEntityTypeConfiguration<GroceryListItem>
{
    public void Configure(EntityTypeBuilder<GroceryListItem> builder)
    {
        builder.ToTable("GroceryListItems", "grocery");
        builder.ConfigureBaseEntity();

        builder.Property(i => i.Name).HasMaxLength(150).IsRequired();
        builder.Property(i => i.Quantity).HasPrecision(10, 2);
        builder.Property(i => i.Status).HasConversion<string>().HasMaxLength(20);

        builder.HasOne(i => i.GroceryList)
            .WithMany(l => l.Items)
            .HasForeignKey(i => i.GroceryListId)
            .OnDelete(DeleteBehavior.Cascade);

        // Restrict, not SetNull: Pantry already cascades to GroceryList (which
        // cascades to this table), and Pantry also cascades to PantryItem — a
        // second cascading path here would create the same multi-path conflict
        // fixed on MenuItem.RestaurantId (see that config for the full explanation).
        builder.HasOne(i => i.PantryItem)
            .WithMany()
            .HasForeignKey(i => i.PantryItemId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(i => i.AddedByFlatMember)
            .WithMany()
            .HasForeignKey(i => i.AddedByFlatMemberId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
