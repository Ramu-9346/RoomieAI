namespace RoomieAI.Domain.Enums;

public enum MemberRole
{
    Owner = 0,
    Admin = 1,
    Member = 2,
}

public enum InvitationStatus
{
    Pending = 0,
    Accepted = 1,
    Declined = 2,
    Expired = 3,
    Revoked = 4,
}
