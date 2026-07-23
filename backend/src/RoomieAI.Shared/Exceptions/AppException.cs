namespace RoomieAI.Shared.Exceptions;

/// <summary>
/// Base type for exceptions the global exception middleware understands and maps
/// to a specific HTTP status + <see cref="Responses.ApiResponseStatus"/>. Anything
/// that isn't an <see cref="AppException"/> is treated as an unexpected server
/// error and its details are never sent to the client.
/// </summary>
public abstract class AppException : Exception
{
    protected AppException(string message) : base(message)
    {
    }

    protected AppException(string message, Exception innerException) : base(message, innerException)
    {
    }
}
