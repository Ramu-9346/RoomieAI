namespace RoomieAI.Shared.Exceptions;

/// <summary>Maps to HTTP 404.</summary>
public class NotFoundException : AppException
{
    public NotFoundException(string message) : base(message)
    {
    }

    public NotFoundException(string entityName, object key)
        : base($"Entity \"{entityName}\" with key ({key}) was not found.")
    {
    }
}
