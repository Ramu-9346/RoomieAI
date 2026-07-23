using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoomieAI.Domain.Entities.AI;
using RoomieAI.Infrastructure.Persistence.Configurations.Common;

namespace RoomieAI.Infrastructure.Persistence.Configurations.AI;

public class AIActionConfiguration : IEntityTypeConfiguration<AIAction>
{
    public void Configure(EntityTypeBuilder<AIAction> builder)
    {
        builder.ToTable("AIActions", "ai");
        builder.ConfigureBaseEntity();

        builder.Property(a => a.ActionType).HasConversion<string>().HasMaxLength(30);
        builder.Property(a => a.Status).HasConversion<string>().HasMaxLength(20);
        builder.Property(a => a.PayloadJson).HasColumnType("nvarchar(max)").IsRequired();
        builder.Property(a => a.TargetEntityType).HasMaxLength(100);
        builder.Property(a => a.ErrorMessage).HasMaxLength(1000);

        // Deliberately no FK on TargetEntityType/TargetEntityId — soft polymorphic
        // reference, see Domain.Entities.AI.AIAction for the reasoning.
        builder.HasIndex(a => new { a.TargetEntityType, a.TargetEntityId });

        builder.HasOne(a => a.Conversation)
            .WithMany(c => c.Actions)
            .HasForeignKey(a => a.ConversationId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
