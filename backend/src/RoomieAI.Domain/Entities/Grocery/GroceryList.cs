using RoomieAI.Domain.Common;
using RoomieAI.Domain.Entities.Identity;
using RoomieAI.Domain.Entities.Ordering;
using RoomieAI.Domain.Enums;

namespace RoomieAI.Domain.Entities.Grocery;

/// <summary>A shopping run derived from pantry state. Checkout links it to an Instamart <see cref="Order"/>.</summary>
public class GroceryList : BaseEntity
{
    public Guid PantryId { get; set; }

    public Pantry Pantry { get; set; } = null!;

    public GroceryListStatus Status { get; set; } = GroceryListStatus.Draft;

    public Guid CreatedByUserId { get; set; }

    public User CreatedByUser { get; set; } = null!;

    /// <summary>Set once the list is "checked out" as an Instamart order.</summary>
    public Guid? LinkedOrderId { get; set; }

    public Order? LinkedOrder { get; set; }

    public ICollection<GroceryListItem> Items { get; set; } = [];
}
