using RoomieAI.Domain.Common;
using RoomieAI.Domain.Entities.Ordering;

namespace RoomieAI.Domain.Entities.Integration;

/// <summary>
/// Append-only inbound webhook log. <see cref="ExternalEventId"/> is Swiggy's event
/// id, used as an idempotency key to survive at-least-once delivery.
/// </summary>
public class SwiggyWebhookEvent : BaseEntity
{
    public Guid? SwiggyAccountLinkId { get; set; }

    public SwiggyAccountLink? SwiggyAccountLink { get; set; }

    public string ExternalEventId { get; set; } = null!;

    public string EventType { get; set; } = null!;

    public string RawPayloadJson { get; set; } = null!;

    /// <summary>Null means pending processing.</summary>
    public DateTime? ProcessedAt { get; set; }

    public Guid? RelatedOrderId { get; set; }

    public Order? RelatedOrder { get; set; }
}
