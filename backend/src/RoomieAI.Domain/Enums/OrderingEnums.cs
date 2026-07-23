namespace RoomieAI.Domain.Enums;

/// <summary>Which Swiggy vertical an <see cref="Entities.Ordering.Order"/> belongs to.</summary>
public enum OrderChannel
{
    Food = 0,
    Instamart = 1,
    Dineout = 2,
}

public enum OrderStatus
{
    Draft = 0,
    Open = 1,
    Locked = 2,
    Placed = 3,
    Confirmed = 4,
    OutForDelivery = 5,
    Delivered = 6,
    Cancelled = 7,
    Failed = 8,
}

public enum OrderParticipantStatus
{
    Joined = 0,
    Left = 1,
    Removed = 2,
}

/// <summary>Kept open for future methods beyond COD (BRD C-001).</summary>
public enum PaymentMethod
{
    COD = 0,
}

public enum PaymentCollectionStatus
{
    Pending = 0,
    Collected = 1,
    Waived = 2,
}

/// <summary>Where an <see cref="Entities.Ordering.OrderStatusHistory"/> transition originated.</summary>
public enum OrderStatusChangeSource
{
    UserAction = 0,
    SwiggyWebhook = 1,
    System = 2,
}
