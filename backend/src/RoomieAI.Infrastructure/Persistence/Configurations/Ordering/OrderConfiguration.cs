using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoomieAI.Domain.Entities.Ordering;
using RoomieAI.Infrastructure.Persistence.Configurations.Common;

namespace RoomieAI.Infrastructure.Persistence.Configurations.Ordering;

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.ToTable("Orders", "ordering");
        builder.ConfigureBaseEntity();

        builder.Property(o => o.Channel).HasConversion<string>().HasMaxLength(20);
        builder.Property(o => o.Status).HasConversion<string>().HasMaxLength(20);
        builder.Property(o => o.PaymentMethod).HasConversion<string>().HasMaxLength(20);
        builder.Property(o => o.CartCapRupees).HasPrecision(10, 2);
        builder.Property(o => o.TotalAmountRupees).HasPrecision(10, 2);
        builder.Property(o => o.SwiggyOrderId).HasMaxLength(100);

        // Hot path: "active orders for flat".
        builder.HasIndex(o => new { o.FlatId, o.Status });

        builder.HasOne(o => o.Flat)
            .WithMany(f => f.Orders)
            .HasForeignKey(o => o.FlatId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(o => o.Restaurant)
            .WithMany()
            .HasForeignKey(o => o.RestaurantId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(o => o.CreatedByUser)
            .WithMany()
            .HasForeignKey(o => o.CreatedByUserId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
