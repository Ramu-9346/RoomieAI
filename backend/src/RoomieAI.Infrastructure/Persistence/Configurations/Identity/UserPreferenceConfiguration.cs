using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoomieAI.Domain.Entities.Identity;
using RoomieAI.Infrastructure.Persistence.Configurations.Common;

namespace RoomieAI.Infrastructure.Persistence.Configurations.Identity;

public class UserPreferenceConfiguration : IEntityTypeConfiguration<UserPreference>
{
    public void Configure(EntityTypeBuilder<UserPreference> builder)
    {
        builder.ToTable("UserPreferences", "identity");
        builder.ConfigureBaseEntity();

        builder.Property(p => p.PreferredLanguage).HasMaxLength(10).IsRequired();
        builder.Property(p => p.ThemeMode).HasMaxLength(10).IsRequired();

        builder.HasIndex(p => p.UserId).IsUnique();
    }
}
