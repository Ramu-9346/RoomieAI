using RoomieAI.Domain.Common;
using RoomieAI.Domain.Entities.Flats;
using RoomieAI.Domain.Enums;

namespace RoomieAI.Domain.Entities.Ordering;

public class OrderParticipant : BaseEntity
{
    public Guid OrderId { get; set; }

    public Order Order { get; set; } = null!;

    public Guid FlatMemberId { get; set; }

    public FlatMember FlatMember { get; set; } = null!;

    public DateTime JoinedAt { get; set; }

    public OrderParticipantStatus Status { get; set; } = OrderParticipantStatus.Joined;

    /// <summary>Defaults to <see cref="Order.CartCapRupees"/>; may be overridden per participant.</summary>
    public decimal ContributionCapRupees { get; set; }

    public PaymentCollectionStatus CollectionStatus { get; set; } = PaymentCollectionStatus.Pending;

    public ICollection<OrderItem> Items { get; set; } = [];
}
