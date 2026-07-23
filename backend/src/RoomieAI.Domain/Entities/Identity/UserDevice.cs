using RoomieAI.Domain.Common;
using RoomieAI.Domain.Enums;

namespace RoomieAI.Domain.Entities.Identity;

/// <summary>
/// A registered client device/session. Also carries the push token, so no separate
/// "NotificationToken" entity exists — see Phase 6 architecture review.
/// </summary>
public class UserDevice : BaseEntity
{
    public Guid UserId { get; set; }

    public User User { get; set; } = null!;

    public string DeviceId { get; set; } = null!;

    public DevicePlatform Platform { get; set; }

    /// <summary>Null when the device is registered but not push-eligible.</summary>
    public string? PushToken { get; set; }

    public string? AppVersion { get; set; }

    public DateTime LastActiveAt { get; set; }
}
