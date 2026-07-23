using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoomieAI.Domain.Entities.Polls;
using RoomieAI.Infrastructure.Persistence.Configurations.Common;

namespace RoomieAI.Infrastructure.Persistence.Configurations.Polls;

public class VoteConfiguration : IEntityTypeConfiguration<Vote>
{
    public void Configure(EntityTypeBuilder<Vote> builder)
    {
        builder.ToTable("Votes", "poll");
        builder.ConfigureBaseEntity();

        // MultiChoice allows one vote per option per member; SingleChoice-level
        // uniqueness (one option per poll per member) is enforced in Application.
        builder.HasIndex(v => new { v.PollOptionId, v.FlatMemberId }).IsUnique();

        builder.HasOne(v => v.PollOption)
            .WithMany(o => o.Votes)
            .HasForeignKey(v => v.PollOptionId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(v => v.FlatMember)
            .WithMany()
            .HasForeignKey(v => v.FlatMemberId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
