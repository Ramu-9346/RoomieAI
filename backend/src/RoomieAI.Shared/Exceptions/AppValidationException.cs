namespace RoomieAI.Shared.Exceptions;

/// <summary>
/// Maps to HTTP 400 with a field-level error breakdown. Named distinctly from
/// FluentValidation's own <c>ValidationException</c> to avoid ambiguity where both
/// are in scope — the Application-layer validation pipeline behavior will catch
/// FluentValidation's exception and re-throw this one.
/// </summary>
public class AppValidationException : AppException
{
    public IDictionary<string, string[]> Errors { get; }

    public AppValidationException() : base("One or more validation errors occurred.")
    {
        Errors = new Dictionary<string, string[]>();
    }

    public AppValidationException(IDictionary<string, string[]> errors)
        : base("One or more validation errors occurred.")
    {
        Errors = errors;
    }
}
