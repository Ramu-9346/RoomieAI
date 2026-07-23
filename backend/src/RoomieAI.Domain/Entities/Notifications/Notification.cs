using RoomieAI.Domain.Common;
using RoomieAI.Domain.Entities.Identity;
using RoomieAI.Domain.Enums;

namespace RoomieAI.Domain.Entities.Notifications;

public class Notification : BaseEntity, IAggregateRoot
{
    public Guid UserId { get; set; }

    public User User { get; set; } = null!;

    public NotificationCategory Category { get; set; }

    public string Title { get; set; } = null!;

    public string Body { get; set; } = null!;

    public NotificationChannel Channel { get; set; }

    /// <summary>Matches the mobile client's DeepLinks map (join/order/poll/payment).</summary>
    public string? DeepLinkPath { get; set; }

    public bool IsRead { get; set; }

    public DateTime? ReadAt { get; set; }

    public DateTime SentAt { get; set; }
}
