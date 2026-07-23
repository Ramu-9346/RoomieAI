namespace RoomieAI.Shared.Exceptions;

/// <summary>Maps to HTTP 409 — e.g. a unique-constraint violation or a stale concurrency token.</summary>
public class ConflictException(string message) : AppException(message);
