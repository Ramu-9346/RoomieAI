using RoomieAI.Domain.Common;
using RoomieAI.Domain.Entities.Identity;
using RoomieAI.Domain.Enums;

namespace RoomieAI.Domain.Entities.Flats;

/// <summary>
/// Join entity between <see cref="Flat"/> and <see cref="User"/> — the identity a
/// person has within that specific flat (role, colour, nickname), not just an FK bridge.
/// </summary>
public class FlatMember : BaseEntity
{
    public Guid FlatId { get; set; }

    public Flat Flat { get; set; } = null!;

    public Guid UserId { get; set; }

    public User User { get; set; } = null!;

    public MemberRole Role { get; set; } = MemberRole.Member;

    /// <summary>Assigned from the fixed 8-value member colour palette (index = join order mod 8).</summary>
    public string ColorHex { get; set; } = null!;

    public string? Nickname { get; set; }

    public DateTime JoinedAt { get; set; }

    /// <summary>Null while active. Row retained (never deleted) after leaving for expense-history integrity.</summary>
    public DateTime? LeftAt { get; set; }
}
