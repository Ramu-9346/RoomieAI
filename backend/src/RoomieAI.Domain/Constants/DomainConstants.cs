namespace RoomieAI.Domain.Constants;

/// <summary>
/// Business rule constants sourced from the BRD. Mirrors the RoomieAI mobile client's
/// <c>constants/app.ts</c> so both sides agree on the same limits.
/// </summary>
public static class DomainConstants
{
    /// <summary>BRD C-002: max food cart contribution per participant, in rupees.</summary>
    public const decimal FoodCartCapRupees = 1000m;

    /// <summary>BRD C-004: Swiggy OAuth token lifespan, in days.</summary>
    public const int SwiggyTokenTtlDays = 5;

    /// <summary>BRD C-001: cash on delivery is the only supported payment method for now.</summary>
    public const bool CodOnly = true;

    /// <summary>Hard ceiling on active members per flat; also sizes the member colour palette.</summary>
    public const int MaxFlatMembers = 8;

    public const int MaxPollOptions = 5;

    public const int DefaultPollTimeoutMinutes = 5;

    public const int MaxChatMessageLength = 2000;

    public const int ChatHistoryPageSize = 30;

    public const int DefaultPageSize = 20;

    /// <summary>DPDP Act 2023: default retention window for personal data, in days.</summary>
    public const int DataRetentionDays = 30;
}
