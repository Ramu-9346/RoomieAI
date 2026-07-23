using RoomieAI.Domain.Common;
using RoomieAI.Domain.Entities.Flats;
using RoomieAI.Domain.Entities.Identity;
using RoomieAI.Domain.Enums;

namespace RoomieAI.Domain.Entities.AI;

public class AIRecommendation : BaseEntity
{
    public Guid FlatId { get; set; }

    public Flat Flat { get; set; } = null!;

    /// <summary>Null for a flat-wide recommendation rather than a personal one.</summary>
    public Guid? UserId { get; set; }

    public User? User { get; set; }

    public AIRecommendationType Type { get; set; }

    public string? PayloadJson { get; set; }

    public bool IsDismissed { get; set; }

    public DateTime? ExpiresAt { get; set; }
}
