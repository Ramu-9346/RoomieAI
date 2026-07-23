namespace RoomieAI.Domain.Common;

/// <summary>
/// Marker interface identifying an entity as an aggregate root — the only kind of
/// entity a repository may load or persist directly. Child entities are reached
/// through their owning aggregate, never fetched independently.
/// </summary>
public interface IAggregateRoot
{
}
