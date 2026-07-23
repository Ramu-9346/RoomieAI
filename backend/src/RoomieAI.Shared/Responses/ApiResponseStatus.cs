namespace RoomieAI.Shared.Responses;

public enum ApiResponseStatus
{
    Success = 0,
    Failure = 1,
    ValidationError = 2,
    Unauthorized = 3,
    Forbidden = 4,
    NotFound = 5,
    Conflict = 6,
    ServerError = 7,
}
