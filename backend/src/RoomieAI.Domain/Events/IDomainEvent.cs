namespace RoomieAI.Domain.Events;

/// <summary>
/// Marker interface for domain events raised by aggregates. Deliberately free of any
/// dispatch-mechanism dependency (e.g. MediatR) — the Domain layer stays dependency-free.
/// Infrastructure collects these post-<c>SaveChangesAsync</c> and adapts/publishes them.
/// </summary>
public interface IDomainEvent
{
    DateTime OccurredOn { get; }
}
