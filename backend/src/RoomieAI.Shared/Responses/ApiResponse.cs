namespace RoomieAI.Shared.Responses;

/// <summary>
/// The single response envelope every API endpoint returns, success or failure,
/// so clients (the RN app's Axios/React Query layer) can handle responses uniformly.
/// </summary>
public class ApiResponse
{
    public bool IsSuccess { get; init; }

    public ApiResponseStatus Status { get; init; }

    public string? Message { get; init; }

    /// <summary>Field name → error messages. Populated only for <see cref="ApiResponseStatus.ValidationError"/>.</summary>
    public IDictionary<string, string[]>? Errors { get; init; }

    public static ApiResponse Success(string? message = null) =>
        new() { IsSuccess = true, Status = ApiResponseStatus.Success, Message = message };

    public static ApiResponse Failure(string message, ApiResponseStatus status = ApiResponseStatus.Failure) =>
        new() { IsSuccess = false, Status = status, Message = message };

    public static ApiResponse ValidationFailure(IDictionary<string, string[]> errors) =>
        new()
        {
            IsSuccess = false,
            Status = ApiResponseStatus.ValidationError,
            Message = "One or more validation errors occurred.",
            Errors = errors,
        };

    public static ApiResponse NotFound(string message = "The requested resource was not found.") =>
        new() { IsSuccess = false, Status = ApiResponseStatus.NotFound, Message = message };

    public static ApiResponse Unauthorized(string message = "Authentication is required.") =>
        new() { IsSuccess = false, Status = ApiResponseStatus.Unauthorized, Message = message };

    public static ApiResponse Forbidden(string message = "You do not have permission to perform this action.") =>
        new() { IsSuccess = false, Status = ApiResponseStatus.Forbidden, Message = message };

    public static ApiResponse Conflict(string message) =>
        new() { IsSuccess = false, Status = ApiResponseStatus.Conflict, Message = message };

    public static ApiResponse ServerError(string message = "An unexpected error occurred. Please try again later.") =>
        new() { IsSuccess = false, Status = ApiResponseStatus.ServerError, Message = message };
}

/// <summary>Envelope carrying a payload alongside the standard status/message fields.</summary>
public class ApiResponse<T> : ApiResponse
{
    public T? Data { get; init; }

    public static ApiResponse<T> Success(T data, string? message = null) =>
        new() { IsSuccess = true, Status = ApiResponseStatus.Success, Message = message, Data = data };

    public static new ApiResponse<T> Failure(string message, ApiResponseStatus status = ApiResponseStatus.Failure) =>
        new() { IsSuccess = false, Status = status, Message = message };

    public static new ApiResponse<T> ValidationFailure(IDictionary<string, string[]> errors) =>
        new()
        {
            IsSuccess = false,
            Status = ApiResponseStatus.ValidationError,
            Message = "One or more validation errors occurred.",
            Errors = errors,
        };

    public static new ApiResponse<T> NotFound(string message = "The requested resource was not found.") =>
        new() { IsSuccess = false, Status = ApiResponseStatus.NotFound, Message = message };

    public static new ApiResponse<T> ServerError(string message = "An unexpected error occurred. Please try again later.") =>
        new() { IsSuccess = false, Status = ApiResponseStatus.ServerError, Message = message };
}
