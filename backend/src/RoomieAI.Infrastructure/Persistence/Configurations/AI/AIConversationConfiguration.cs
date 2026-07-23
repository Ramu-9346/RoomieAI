using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoomieAI.Domain.Entities.AI;
using RoomieAI.Infrastructure.Persistence.Configurations.Common;

namespace RoomieAI.Infrastructure.Persistence.Configurations.AI;

public class AIConversationConfiguration : IEntityTypeConfiguration<AIConversation>
{
    public void Configure(EntityTypeBuilder<AIConversation> builder)
    {
        builder.ToTable("AIConversations", "ai");
        builder.ConfigureBaseEntity();

        builder.Property(c => c.Title).HasMaxLength(200);
        builder.Property(c => c.Status).HasConversion<string>().HasMaxLength(20);

        builder.HasIndex(c => new { c.UserId, c.LastMessageAt });

        builder.HasOne(c => c.User)
            .WithMany()
            .HasForeignKey(c => c.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(c => c.Flat)
            .WithMany()
            .HasForeignKey(c => c.FlatId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
