using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoomieAI.Domain.Entities.Identity;
using RoomieAI.Infrastructure.Persistence.Configurations.Common;

namespace RoomieAI.Infrastructure.Persistence.Configurations.Identity;

public class UserDeviceConfiguration : IEntityTypeConfiguration<UserDevice>
{
    public void Configure(EntityTypeBuilder<UserDevice> builder)
    {
        builder.ToTable("UserDevices", "identity");
        builder.ConfigureBaseEntity();

        builder.Property(d => d.DeviceId).HasMaxLength(200).IsRequired();
        builder.Property(d => d.Platform).HasConversion<string>().HasMaxLength(20);
        builder.Property(d => d.PushToken).HasMaxLength(500);
        builder.Property(d => d.AppVersion).HasMaxLength(20);

        builder.HasIndex(d => new { d.UserId, d.DeviceId }).IsUnique().HasFilter("[IsDeleted] = 0");
    }
}
