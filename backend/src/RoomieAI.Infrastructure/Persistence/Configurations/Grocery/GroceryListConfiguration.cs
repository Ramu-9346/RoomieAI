using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoomieAI.Domain.Entities.Grocery;
using RoomieAI.Infrastructure.Persistence.Configurations.Common;

namespace RoomieAI.Infrastructure.Persistence.Configurations.Grocery;

public class GroceryListConfiguration : IEntityTypeConfiguration<GroceryList>
{
    public void Configure(EntityTypeBuilder<GroceryList> builder)
    {
        builder.ToTable("GroceryLists", "grocery");
        builder.ConfigureBaseEntity();

        builder.Property(l => l.Status).HasConversion<string>().HasMaxLength(20);

        builder.HasOne(l => l.Pantry)
            .WithMany(p => p.GroceryLists)
            .HasForeignKey(l => l.PantryId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(l => l.CreatedByUser)
            .WithMany()
            .HasForeignKey(l => l.CreatedByUserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(l => l.LinkedOrder)
            .WithMany()
            .HasForeignKey(l => l.LinkedOrderId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
