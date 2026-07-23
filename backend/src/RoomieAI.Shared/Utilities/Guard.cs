using RoomieAI.Shared.Exceptions;

namespace RoomieAI.Shared.Utilities;

/// <summary>Small set of precondition helpers for validating arguments at method boundaries.</summary>
public static class Guard
{
    public static T NotNull<T>(T? value, string parameterName) where T : class =>
        value ?? throw new ArgumentNullException(parameterName);

    public static string NotNullOrWhiteSpace(string? value, string parameterName)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            throw new ArgumentException("Value cannot be null or whitespace.", parameterName);
        }

        return value;
    }

    public static Guid NotEmpty(Guid value, string parameterName)
    {
        if (value == Guid.Empty)
        {
            throw new ArgumentException("Value cannot be an empty GUID.", parameterName);
        }

        return value;
    }

    public static T NotNullOrNotFound<T>(T? value, string entityName, object key) where T : class =>
        value ?? throw new NotFoundException(entityName, key);
}
