using RoomieAI.Domain.Common;
using RoomieAI.Domain.Entities.Identity;

namespace RoomieAI.Domain.Entities.System;

/// <summary>
/// DPDP compliance / security forensics artifact. Immutable, never soft-deleted;
/// purged strictly by a retention-policy job, not by user action.
/// </summary>
public class AuditLog : BaseEntity, IAggregateRoot
{
    public Guid UserId { get; set; }

    public User User { get; set; } = null!;

    public string Action { get; set; } = null!;

    public string? IpAddress { get; set; }

    public string? UserAgent { get; set; }

    public string? MetadataJson { get; set; }

    public DateTime OccurredAt { get; set; }
}
