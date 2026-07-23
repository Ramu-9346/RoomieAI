using RoomieAI.Domain.Common;
using RoomieAI.Domain.Enums;

namespace RoomieAI.Domain.Entities.AI;

public class AIMessage : BaseEntity
{
    public Guid ConversationId { get; set; }

    public AIConversation Conversation { get; set; } = null!;

    public AIMessageRole Role { get; set; }

    public string Content { get; set; } = null!;

    public DateTime SentAt { get; set; }

    /// <summary>Null unless token usage tracking is enabled for this message.</summary>
    public int? TokenCount { get; set; }
}
