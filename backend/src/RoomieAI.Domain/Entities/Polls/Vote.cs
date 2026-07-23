using RoomieAI.Domain.Common;
using RoomieAI.Domain.Entities.Flats;

namespace RoomieAI.Domain.Entities.Polls;

public class Vote : BaseEntity
{
    public Guid PollOptionId { get; set; }

    public PollOption PollOption { get; set; } = null!;

    public Guid FlatMemberId { get; set; }

    public FlatMember FlatMember { get; set; } = null!;

    public DateTime VotedAt { get; set; }
}
