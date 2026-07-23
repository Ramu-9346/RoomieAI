using RoomieAI.Domain.Common;
using RoomieAI.Domain.Enums;

namespace RoomieAI.Domain.Entities.AI;

/// <summary>
/// A structured, auditable side effect the AI proposed/executed against another
/// domain. <see cref="TargetEntityType"/>/<see cref="TargetEntityId"/> form a
/// deliberate soft polymorphic reference with no FK constraint — see Phase 6
/// architecture review (navigation properties section) for the reasoning.
/// </summary>
public class AIAction : BaseEntity
{
    public Guid ConversationId { get; set; }

    public AIConversation Conversation { get; set; } = null!;

    public AIActionType ActionType { get; set; }

    public AIActionStatus Status { get; set; } = AIActionStatus.Proposed;

    /// <summary>Structured args the AI proposed, as JSON.</summary>
    public string PayloadJson { get; set; } = null!;

    public string? TargetEntityType { get; set; }

    public Guid? TargetEntityId { get; set; }

    public DateTime? ExecutedAt { get; set; }

    public string? ErrorMessage { get; set; }
}
