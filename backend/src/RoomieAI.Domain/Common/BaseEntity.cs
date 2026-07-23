using RoomieAI.Domain.Events;

namespace RoomieAI.Domain.Common;

/// <summary>
/// Base type for every domain entity. Provides identity, audit stamps, soft-delete
/// bookkeeping, optimistic concurrency, and an in-memory domain event buffer.
/// </summary>
public abstract class BaseEntity
{
    public Guid Id { get; protected set; } = Guid.NewGuid();

    public DateTime CreatedAt { get; set; }

    public Guid? CreatedBy { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public Guid? UpdatedBy { get; set; }

    public bool IsDeleted { get; set; }

    public DateTime? DeletedAt { get; set; }

    public Guid? DeletedBy { get; set; }

    /// <summary>SQL Server <c>rowversion</c> concurrency token.</summary>
    public byte[] RowVersion { get; set; } = [];

    private readonly List<IDomainEvent> _domainEvents = [];

    /// <summary>Events raised by this entity, dispatched by infrastructure after SaveChanges.</summary>
    public IReadOnlyCollection<IDomainEvent> DomainEvents => _domainEvents.AsReadOnly();

    protected void RaiseDomainEvent(IDomainEvent domainEvent) => _domainEvents.Add(domainEvent);

    public void ClearDomainEvents() => _domainEvents.Clear();
}
