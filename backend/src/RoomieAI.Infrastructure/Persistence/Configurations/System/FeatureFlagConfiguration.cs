using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoomieAI.Domain.Entities.System;
using RoomieAI.Infrastructure.Persistence.Configurations.Common;

namespace RoomieAI.Infrastructure.Persistence.Configurations.System;

public class FeatureFlagConfiguration : IEntityTypeConfiguration<FeatureFlag>
{
    public void Configure(EntityTypeBuilder<FeatureFlag> builder)
    {
        builder.ToTable("FeatureFlags", "system");
        builder.ConfigureBaseEntity();

        builder.Property(f => f.Key).HasMaxLength(150).IsRequired();
        builder.Property(f => f.Scope).HasConversion<string>().HasMaxLength(20);

        builder.HasIndex(f => new { f.Key, f.Scope, f.ScopeId }).IsUnique();
    }
}
