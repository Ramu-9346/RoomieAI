using MediatR;
using RoomieAI.Domain.Events;

namespace RoomieAI.Infrastructure.Persistence.Events;

/// <summary>
/// Adapts a dependency-free <see cref="IDomainEvent"/> into a MediatR <see cref="INotification"/>
/// so it can be published without the Domain layer taking a dependency on MediatR.
/// </summary>
public sealed class DomainEventNotification<TDomainEvent>(TDomainEvent domainEvent) : INotification
    where TDomainEvent : IDomainEvent
{
    public TDomainEvent DomainEvent { get; } = domainEvent;
}
