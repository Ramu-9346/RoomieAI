using RoomieAI.Domain.Common;

namespace RoomieAI.Domain.Entities.Polls;

public class PollOption : BaseEntity
{
    public Guid PollId { get; set; }

    public Poll Poll { get; set; } = null!;

    public string Label { get; set; } = null!;

    public int SortOrder { get; set; }

    public ICollection<Vote> Votes { get; set; } = [];
}
