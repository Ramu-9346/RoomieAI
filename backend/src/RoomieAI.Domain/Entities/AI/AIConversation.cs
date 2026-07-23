using RoomieAI.Domain.Common;
using RoomieAI.Domain.Entities.Flats;
using RoomieAI.Domain.Entities.Identity;
using RoomieAI.Domain.Enums;

namespace RoomieAI.Domain.Entities.AI;

public class AIConversation : BaseEntity, IAggregateRoot
{
    public Guid UserId { get; set; }

    public User User { get; set; } = null!;

    /// <summary>Null for a personal (non-flat-scoped) conversation.</summary>
    public Guid? FlatId { get; set; }

    public Flat? Flat { get; set; }

    public string? Title { get; set; }

    public AIConversationStatus Status { get; set; } = AIConversationStatus.Active;

    public DateTime? LastMessageAt { get; set; }

    public ICollection<AIMessage> Messages { get; set; } = [];

    public ICollection<AIAction> Actions { get; set; } = [];
}
