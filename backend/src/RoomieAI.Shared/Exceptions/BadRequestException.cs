namespace RoomieAI.Shared.Exceptions;

/// <summary>Maps to HTTP 400 for malformed/invalid requests that aren't field-validation failures.</summary>
public class BadRequestException(string message) : AppException(message);
