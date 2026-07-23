using RoomieAI.Domain.Common;
using RoomieAI.Domain.Entities.Flats;
using RoomieAI.Domain.Entities.Identity;
using RoomieAI.Domain.Enums;

namespace RoomieAI.Domain.Entities.Ordering;

/// <summary>
/// A group cart. Unifies Food, Instamart, and Dineout under one aggregate via
/// <see cref="Channel"/> — they share identical group-cart mechanics (participants,
/// cap enforcement, COD collection); see Phase 6 architecture review.
/// </summary>
public class Order : BaseEntity, IAggregateRoot
{
    public Guid FlatId { get; set; }

    public Flat Flat { get; set; } = null!;

    /// <summary>Null for Dineout reservations without a specific restaurant record yet.</summary>
    public Guid? RestaurantId { get; set; }

    public Restaurant? Restaurant { get; set; }

    public OrderChannel Channel { get; set; }

    public OrderStatus Status { get; set; } = OrderStatus.Draft;

    public Guid CreatedByUserId { get; set; }

    public User CreatedByUser { get; set; } = null!;

    /// <summary>Snapshot of <see cref="Constants.DomainConstants.FoodCartCapRupees"/> at order creation.</summary>
    public decimal CartCapRupees { get; set; }

    public decimal TotalAmountRupees { get; set; }

    public PaymentMethod PaymentMethod { get; set; } = PaymentMethod.COD;

    public DateTime? LockedAt { get; set; }

    public string? SwiggyOrderId { get; set; }

    public ICollection<OrderParticipant> Participants { get; set; } = [];

    public ICollection<OrderItem> Items { get; set; } = [];

    public ICollection<OrderStatusHistory> StatusHistory { get; set; } = [];
}
