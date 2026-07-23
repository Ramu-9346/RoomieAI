using RoomieAI.Domain.Common;
using RoomieAI.Domain.Enums;

namespace RoomieAI.Domain.Entities.Ordering;

/// <summary>Append-only audit trail of an <see cref="Order"/>'s status transitions.</summary>
public class OrderStatusHistory : BaseEntity
{
    public Guid OrderId { get; set; }

    public Order Order { get; set; } = null!;

    public OrderStatus FromStatus { get; set; }

    public OrderStatus ToStatus { get; set; }

    public DateTime ChangedAt { get; set; }

    public OrderStatusChangeSource Source { get; set; }
}
