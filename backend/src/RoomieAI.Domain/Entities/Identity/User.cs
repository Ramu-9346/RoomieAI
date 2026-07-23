using RoomieAI.Domain.Common;
using RoomieAI.Domain.Entities.Flats;
using RoomieAI.Domain.Enums;

namespace RoomieAI.Domain.Entities.Identity;

/// <summary>The authenticated principal — one row per person, independent of flat membership.</summary>
public class User : BaseEntity, IAggregateRoot
{
    public string FullName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    /// <summary>Null when the account is OAuth-only (future).</summary>
    public string? PasswordHash { get; set; }

    public string? AvatarUrl { get; set; }

    public DateOnly? DateOfBirth { get; set; }

    public bool IsEmailVerified { get; set; }

    public bool IsPhoneVerified { get; set; }

    public DateTime? LastLoginAt { get; set; }

    public UserStatus Status { get; set; } = UserStatus.Active;

    public ICollection<UserDevice> Devices { get; set; } = [];

    public ICollection<RefreshToken> RefreshTokens { get; set; } = [];

    public UserPreference? Preference { get; set; }

    public ICollection<FlatMember> FlatMemberships { get; set; } = [];
}
