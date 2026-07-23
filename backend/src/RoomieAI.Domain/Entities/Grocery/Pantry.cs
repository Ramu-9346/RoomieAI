using RoomieAI.Domain.Common;
using RoomieAI.Domain.Entities.Flats;

namespace RoomieAI.Domain.Entities.Grocery;

/// <summary>1:1 with <see cref="Flat"/>. A container for current stock state.</summary>
public class Pantry : BaseEntity, IAggregateRoot
{
    public Guid FlatId { get; set; }

    public Flat Flat { get; set; } = null!;

    public DateTime? LastRestockedAt { get; set; }

    public ICollection<PantryItem> Items { get; set; } = [];

    public ICollection<GroceryList> GroceryLists { get; set; } = [];
}
