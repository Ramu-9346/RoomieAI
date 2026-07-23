using RoomieAI.Domain.Common;
using RoomieAI.Domain.Constants;
using RoomieAI.Domain.Entities.Expenses;
using RoomieAI.Domain.Entities.Grocery;
using RoomieAI.Domain.Entities.Ordering;
using RoomieAI.Domain.Entities.Polls;
using RoomieAI.Domain.Entities.System;
using RoomieAI.Domain.ValueObjects;

namespace RoomieAI.Domain.Entities.Flats;

/// <summary>The household/tenancy — the scoping boundary for almost everything else.</summary>
public class Flat : BaseEntity, IAggregateRoot
{
    public string Name { get; set; } = null!;

    /// <summary>Owned value object; optional (a flat can exist before its address is filled in).</summary>
    public Address? Address { get; set; }

    public string InviteCode { get; set; } = null!;

    public Guid CreatedByUserId { get; set; }

    public int MaxMembers { get; set; } = DomainConstants.MaxFlatMembers;

    public ICollection<FlatMember> Members { get; set; } = [];

    public ICollection<Invitation> Invitations { get; set; } = [];

    public ICollection<Order> Orders { get; set; } = [];

    public Pantry? Pantry { get; set; }

    public ICollection<Expense> Expenses { get; set; } = [];

    public ICollection<Settlement> Settlements { get; set; } = [];

    public ICollection<Poll> Polls { get; set; } = [];

    public ICollection<ActivityLog> ActivityLogs { get; set; } = [];
}
