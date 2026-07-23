namespace RoomieAI.Api.Configuration;

/// <summary>
/// Binds the "Jwt" configuration section. Configuration only for this phase — no
/// token generation or <c>AddAuthentication().AddJwtBearer()</c> wiring yet; that
/// lands when the Identity module is built.
/// </summary>
public class JwtSettings
{
    public const string SectionName = "Jwt";

    public string Issuer { get; set; } = string.Empty;

    public string Audience { get; set; } = string.Empty;

    public string SigningKey { get; set; } = string.Empty;

    public int AccessTokenExpirationMinutes { get; set; } = 15;

    public int RefreshTokenExpirationDays { get; set; } = 30;
}
