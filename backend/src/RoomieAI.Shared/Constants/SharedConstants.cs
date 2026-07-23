namespace RoomieAI.Shared.Constants;

/// <summary>Cross-cutting constants used by more than one layer (e.g. Api middleware and Application behaviors).</summary>
public static class SharedConstants
{
    /// <summary>Request header carrying a client- or gateway-generated correlation id for log tracing.</summary>
    public const string CorrelationIdHeaderName = "X-Correlation-Id";

    public const string DefaultCulture = "en-IN";
}
