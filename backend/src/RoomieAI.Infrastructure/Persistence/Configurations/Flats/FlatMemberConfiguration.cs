using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoomieAI.Domain.Entities.Flats;
using RoomieAI.Infrastructure.Persistence.Configurations.Common;

namespace RoomieAI.Infrastructure.Persistence.Configurations.Flats;

public class FlatMemberConfiguration : IEntityTypeConfiguration<FlatMember>
{
    public void Configure(EntityTypeBuilder<FlatMember> builder)
    {
        builder.ToTable("FlatMembers", "flat");
        builder.ConfigureBaseEntity();

        builder.Property(m => m.Role).HasConversion<string>().HasMaxLength(20);
        builder.Property(m => m.ColorHex).HasMaxLength(7).IsFixedLength().IsRequired();
        builder.Property(m => m.Nickname).HasMaxLength(50);

        // Active-membership uniqueness only — a user can rejoin after leaving.
        builder.HasIndex(m => new { m.FlatId, m.UserId })
            .IsUnique()
            .HasFilter("[LeftAt] IS NULL");

        builder.HasOne(m => m.User)
            .WithMany(u => u.FlatMemberships)
            .HasForeignKey(m => m.UserId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
