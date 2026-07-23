using RoomieAI.Domain.Common;

namespace RoomieAI.Domain.Entities.Ordering;

/// <summary>
/// A cart line. Name/price are snapshotted at add-time and never re-joined to
/// <see cref="MenuItem"/> live — menu prices change, past orders shouldn't.
/// </summary>
public class OrderItem : BaseEntity
{
    public Guid OrderId { get; set; }

    public Order Order { get; set; } = null!;

    /// <summary>Which participant added this item.</summary>
    public Guid OrderParticipantId { get; set; }

    public OrderParticipant OrderParticipant { get; set; } = null!;

    /// <summary>Null for Instamart ad-hoc items not backed by a catalog entry.</summary>
    public Guid? MenuItemId { get; set; }

    public MenuItem? MenuItem { get; set; }

    public string NameSnapshot { get; set; } = null!;

    public decimal UnitPriceSnapshot { get; set; }

    public int Quantity { get; set; } = 1;

    public decimal LineTotal { get; set; }
}
