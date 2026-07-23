using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoomieAI.Domain.Entities.Ordering;
using RoomieAI.Infrastructure.Persistence.Configurations.Common;

namespace RoomieAI.Infrastructure.Persistence.Configurations.Ordering;

public class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
{
    public void Configure(EntityTypeBuilder<OrderItem> builder)
    {
        builder.ToTable("OrderItems", "ordering");
        builder.ConfigureBaseEntity();

        builder.Property(i => i.NameSnapshot).HasMaxLength(200).IsRequired();
        builder.Property(i => i.UnitPriceSnapshot).HasPrecision(10, 2);
        builder.Property(i => i.LineTotal).HasPrecision(10, 2);

        builder.HasOne(i => i.Order)
            .WithMany(o => o.Items)
            .HasForeignKey(i => i.OrderId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(i => i.OrderParticipant)
            .WithMany(p => p.Items)
            .HasForeignKey(i => i.OrderParticipantId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(i => i.MenuItem)
            .WithMany()
            .HasForeignKey(i => i.MenuItemId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
