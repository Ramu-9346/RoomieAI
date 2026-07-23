using RoomieAI.Domain.Common;

namespace RoomieAI.Domain.Entities.Identity;

/// <summary>
/// A JWT refresh token, stored only as a hash. Rotation-on-use: presenting a token
/// issues a new one and revokes the old, chaining via <see cref="ReplacedByTokenHash"/>.
/// Reuse of a revoked token is a breach signal (handled in Application, not here).
/// </summary>
public class RefreshToken : BaseEntity
{
    public Guid UserId { get; set; }

    public User User { get; set; } = null!;

    public string TokenHash { get; set; } = null!;

    public DateTime ExpiresAt { get; set; }

    public DateTime? RevokedAt { get; set; }

    public string? ReplacedByTokenHash { get; set; }
}
