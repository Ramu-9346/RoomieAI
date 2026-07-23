namespace RoomieAI.Api.Configuration;

/// <summary>Binds the "ApplicationSettings" configuration section — general, non-secret app config.</summary>
public class ApplicationSettings
{
    public const string SectionName = "ApplicationSettings";

    public string ApplicationName { get; set; } = "RoomieAI";

    public string ApiVersion { get; set; } = "v1";

    public string[] AllowedCorsOrigins { get; set; } = [];
}
