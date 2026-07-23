namespace RoomieAI.Shared.Exceptions;

/// <summary>Maps to HTTP 403 — authenticated, but not permitted to perform the action.</summary>
public class ForbiddenException(string message = "You do not have permission to perform this action.")
    : AppException(message);
