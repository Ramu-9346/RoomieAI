namespace RoomieAI.Shared.Exceptions;

/// <summary>Maps to HTTP 401.</summary>
public class UnauthorizedException(string message = "Authentication is required to access this resource.")
    : AppException(message);
