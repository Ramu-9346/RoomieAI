using RoomieAI.Domain.Common;
using RoomieAI.Domain.Entities.Identity;
using RoomieAI.Domain.Enums;

namespace RoomieAI.Domain.Entities.Flats;

public class Invitation : BaseEntity
{
    public Guid FlatId { get; set; }

    public Flat Flat { get; set; } = null!;

    public Guid InvitedByUserId { get; set; }

    public User InvitedByUser { get; set; } = null!;

    public string InviteeEmailOrPhone { get; set; } = null!;

    public InvitationStatus Status { get; set; } = InvitationStatus.Pending;

    public DateTime ExpiresAt { get; set; }

    public DateTime? RespondedAt { get; set; }
}
