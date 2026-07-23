using RoomieAI.Domain.Common;
using RoomieAI.Domain.Entities.Identity;
using RoomieAI.Domain.Enums;

namespace RoomieAI.Domain.Entities.Integration;

public class SwiggyAccountLink : BaseEntity, IAggregateRoot
{
    public Guid UserId { get; set; }

    public User User { get; set; } = null!;

    public SwiggyServiceType ServiceType { get; set; }

    public string AccessTokenEncrypted { get; set; } = null!;

    public string RefreshTokenEncrypted { get; set; } = null!;

    /// <summary>LinkedAt + <see cref="Constants.DomainConstants.SwiggyTokenTtlDays"/> days.</summary>
    public DateTime ExpiresAt { get; set; }

    public SwiggyLinkStatus Status { get; set; } = SwiggyLinkStatus.Active;

    public DateTime? LastSyncedAt { get; set; }

    public ICollection<SwiggyWebhookEvent> WebhookEvents { get; set; } = [];

    /// <summary>Domain method, not a public setter — infra re-auths and calls this to extend.</summary>
    public bool IsExpired(DateTime now) => now >= ExpiresAt;
}
