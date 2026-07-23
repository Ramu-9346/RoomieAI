using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoomieAI.Domain.Entities.Flats;
using RoomieAI.Domain.Entities.Grocery;
using RoomieAI.Infrastructure.Persistence.Configurations.Common;

namespace RoomieAI.Infrastructure.Persistence.Configurations.Flats;

public class FlatConfiguration : IEntityTypeConfiguration<Flat>
{
    public void Configure(EntityTypeBuilder<Flat> builder)
    {
        builder.ToTable("Flats", "flat");
        builder.ConfigureBaseEntity();

        builder.Property(f => f.Name).HasMaxLength(100).IsRequired();
        builder.Property(f => f.InviteCode).HasMaxLength(10).IsRequired();

        builder.HasIndex(f => f.InviteCode).IsUnique();

        builder.OwnsOne(f => f.Address, address =>
        {
            address.Property(a => a.Line1).HasColumnName("AddressLine1").HasMaxLength(200);
            address.Property(a => a.Line2).HasColumnName("AddressLine2").HasMaxLength(200);
            address.Property(a => a.City).HasColumnName("City").HasMaxLength(100);
            address.Property(a => a.State).HasColumnName("State").HasMaxLength(100);
            address.Property(a => a.PostalCode).HasColumnName("PostalCode").HasMaxLength(10);
            address.Property(a => a.Country).HasColumnName("Country").HasMaxLength(60);
        });

        builder.HasMany(f => f.Members)
            .WithOne(m => m.Flat)
            .HasForeignKey(m => m.FlatId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(f => f.Invitations)
            .WithOne(i => i.Flat)
            .HasForeignKey(i => i.FlatId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(f => f.Pantry)
            .WithOne(p => p.Flat)
            .HasForeignKey<Pantry>(p => p.FlatId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
