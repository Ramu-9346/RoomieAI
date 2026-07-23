using RoomieAI.Domain.Common;

namespace RoomieAI.Domain.Entities.Identity;

/// <summary>1:1 with <see cref="User"/>. App-level personalization, distinct from per-flat settings.</summary>
public class UserPreference : BaseEntity
{
    public Guid UserId { get; set; }

    public User User { get; set; } = null!;

    public bool NotificationsEnabled { get; set; } = true;

    public string PreferredLanguage { get; set; } = "en";

    public string ThemeMode { get; set; } = "system";

    public bool MarketingOptIn { get; set; }

    /// <summary>DPDP Act consent timestamp; null until the user has made an explicit choice.</summary>
    public DateTime? ConsentedAt { get; set; }
}
