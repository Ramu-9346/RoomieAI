using RoomieAI.Domain.Common;
using RoomieAI.Domain.Entities.Flats;
using RoomieAI.Domain.Enums;

namespace RoomieAI.Domain.Entities.Grocery;

public class GroceryListItem : BaseEntity
{
    public Guid GroceryListId { get; set; }

    public GroceryList GroceryList { get; set; } = null!;

    /// <summary>Null when adding an item not yet tracked in the pantry.</summary>
    public Guid? PantryItemId { get; set; }

    public PantryItem? PantryItem { get; set; }

    public string Name { get; set; } = null!;

    public decimal Quantity { get; set; }

    public GroceryItemStatus Status { get; set; } = GroceryItemStatus.Pending;

    public Guid AddedByFlatMemberId { get; set; }

    public FlatMember AddedByFlatMember { get; set; } = null!;
}
