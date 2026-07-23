using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoomieAI.Domain.Entities.Polls;
using RoomieAI.Infrastructure.Persistence.Configurations.Common;

namespace RoomieAI.Infrastructure.Persistence.Configurations.Polls;

public class PollOptionConfiguration : IEntityTypeConfiguration<PollOption>
{
    public void Configure(EntityTypeBuilder<PollOption> builder)
    {
        builder.ToTable("PollOptions", "poll");
        builder.ConfigureBaseEntity();

        builder.Property(o => o.Label).HasMaxLength(100).IsRequired();

        builder.HasOne(o => o.Poll)
            .WithMany(p => p.Options)
            .HasForeignKey(o => o.PollId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
