using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoomieAI.Domain.Entities.Integration;
using RoomieAI.Infrastructure.Persistence.Configurations.Common;

namespace RoomieAI.Infrastructure.Persistence.Configurations.Integration;

public class SwiggyAccountLinkConfiguration : IEntityTypeConfiguration<SwiggyAccountLink>
{
    public void Configure(EntityTypeBuilder<SwiggyAccountLink> builder)
    {
        builder.ToTable("SwiggyAccountLinks", "integration");
        builder.ConfigureBaseEntity();

        builder.Property(l => l.ServiceType).HasConversion<string>().HasMaxLength(20);
        builder.Property(l => l.AccessTokenEncrypted).HasColumnType("nvarchar(max)").IsRequired();
        builder.Property(l => l.RefreshTokenEncrypted).HasColumnType("nvarchar(max)").IsRequired();
        builder.Property(l => l.Status).HasConversion<string>().HasMaxLength(20);

        builder.HasIndex(l => new { l.UserId, l.ServiceType }).IsUnique();

        builder.HasOne(l => l.User)
            .WithMany()
            .HasForeignKey(l => l.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
