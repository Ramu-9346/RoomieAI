using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using RoomieAI.Shared.Exceptions;
using RoomieAI.Shared.Responses;

namespace RoomieAI.Api.Middleware;

/// <summary>
/// Catches every unhandled exception, logs it, and returns a consistent
/// <see cref="ApiResponse"/> body. Known <see cref="AppException"/> subtypes map to
/// their specific HTTP status; anything else becomes a generic 500 with no internal
/// details leaked to the client.
/// </summary>
public class GlobalExceptionHandler(
    ILogger<GlobalExceptionHandler> logger,
    IHostEnvironment environment) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        var (statusCode, response) = MapException(exception);

        if (statusCode == StatusCodes.Status500InternalServerError)
        {
            logger.LogError(exception, "Unhandled exception processing {Method} {Path}",
                httpContext.Request.Method, httpContext.Request.Path);
        }
        else
        {
            logger.LogWarning(exception, "Handled exception ({StatusCode}) processing {Method} {Path}",
                statusCode, httpContext.Request.Method, httpContext.Request.Path);
        }

        httpContext.Response.StatusCode = statusCode;

        var problemDetails = new ProblemDetails
        {
            Status = statusCode,
            Title = response.Message,
            Type = $"https://httpstatuses.io/{statusCode}",
            Instance = httpContext.Request.Path,
        };

        if (response.Errors is not null)
        {
            problemDetails.Extensions["errors"] = response.Errors;
        }

        if (environment.IsDevelopment())
        {
            problemDetails.Extensions["exception"] = exception.GetType().Name;
            problemDetails.Extensions["stackTrace"] = exception.StackTrace;
        }

        await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken);

        return true;
    }

    private static (int StatusCode, ApiResponse Response) MapException(Exception exception) => exception switch
    {
        AppValidationException ex => (StatusCodes.Status400BadRequest, ApiResponse.ValidationFailure(ex.Errors)),
        BadRequestException ex => (StatusCodes.Status400BadRequest, ApiResponse.Failure(ex.Message, ApiResponseStatus.Failure)),
        UnauthorizedException ex => (StatusCodes.Status401Unauthorized, ApiResponse.Unauthorized(ex.Message)),
        ForbiddenException ex => (StatusCodes.Status403Forbidden, ApiResponse.Forbidden(ex.Message)),
        NotFoundException ex => (StatusCodes.Status404NotFound, ApiResponse.NotFound(ex.Message)),
        ConflictException ex => (StatusCodes.Status409Conflict, ApiResponse.Conflict(ex.Message)),
        _ => (StatusCodes.Status500InternalServerError, ApiResponse.ServerError()),
    };
}
