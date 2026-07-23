using RoomieAI.Domain.Common;
using RoomieAI.Domain.Entities.Flats;
using RoomieAI.Domain.Entities.Identity;

namespace RoomieAI.Domain.Entities.System;

/// <summary>
/// The flat's activity feed — a product feature. Soft-deletable and prunable.
/// Distinct from <see cref="AuditLog"/>, which is a compliance artifact; see
/// Phase 6 architecture review for why the two are kept separate.
/// </summary>
public class ActivityLog : BaseEntity, IAggregateRoot
{
    public Guid FlatId { get; set; }

    public Flat Flat { get; set; } = null!;

    /// <summary>Null for system-generated activity with no human actor.</summary>
    public Guid? ActorUserId { get; set; }

    public User? ActorUser { get; set; }

    public string ActivityType { get; set; } = null!;

    public string Summary { get; set; } = null!;

    public string? MetadataJson { get; set; }

    public DateTime OccurredAt { get; set; }
}
