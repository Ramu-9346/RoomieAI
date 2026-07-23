using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoomieAI.Domain.Entities.AI;
using RoomieAI.Infrastructure.Persistence.Configurations.Common;

namespace RoomieAI.Infrastructure.Persistence.Configurations.AI;

public class AIRecommendationConfiguration : IEntityTypeConfiguration<AIRecommendation>
{
    public void Configure(EntityTypeBuilder<AIRecommendation> builder)
    {
        builder.ToTable("AIRecommendations", "ai");
        builder.ConfigureBaseEntity();

        builder.Property(r => r.Type).HasConversion<string>().HasMaxLength(30);
        builder.Property(r => r.PayloadJson).HasColumnType("nvarchar(max)");

        builder.HasIndex(r => new { r.FlatId, r.IsDismissed });

        builder.HasOne(r => r.Flat)
            .WithMany()
            .HasForeignKey(r => r.FlatId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(r => r.User)
            .WithMany()
            .HasForeignKey(r => r.UserId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
