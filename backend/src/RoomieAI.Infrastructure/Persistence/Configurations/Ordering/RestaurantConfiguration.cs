using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoomieAI.Domain.Entities.Ordering;
using RoomieAI.Infrastructure.Persistence.Configurations.Common;

namespace RoomieAI.Infrastructure.Persistence.Configurations.Ordering;

public class RestaurantConfiguration : IEntityTypeConfiguration<Restaurant>
{
    public void Configure(EntityTypeBuilder<Restaurant> builder)
    {
        builder.ToTable("Restaurants", "ordering");
        builder.ConfigureBaseEntity();

        builder.Property(r => r.SwiggyRestaurantId).HasMaxLength(100).IsRequired();
        builder.Property(r => r.Name).HasMaxLength(200).IsRequired();
        builder.Property(r => r.CuisineTags).HasMaxLength(500);
        builder.Property(r => r.Rating).HasPrecision(2, 1);
        builder.Property(r => r.ServiceType).HasConversion<string>().HasMaxLength(20);

        builder.HasIndex(r => r.SwiggyRestaurantId).IsUnique();
    }
}
