using RoomieAI.Domain.Common;
using RoomieAI.Domain.Constants;
using RoomieAI.Domain.Entities.Flats;
using RoomieAI.Domain.Entities.Identity;
using RoomieAI.Domain.Enums;

namespace RoomieAI.Domain.Entities.Polls;

public class Poll : BaseEntity, IAggregateRoot
{
    public Guid FlatId { get; set; }

    public Flat Flat { get; set; } = null!;

    public Guid CreatedByUserId { get; set; }

    public User CreatedByUser { get; set; } = null!;

    public string Question { get; set; } = null!;

    public PollType Type { get; set; } = PollType.SingleChoice;

    public PollStatus Status { get; set; } = PollStatus.Open;

    public int TimeoutMinutes { get; set; } = DomainConstants.DefaultPollTimeoutMinutes;

    public DateTime ExpiresAt { get; set; }

    public DateTime? ClosedAt { get; set; }

    public ICollection<PollOption> Options { get; set; } = [];
}
