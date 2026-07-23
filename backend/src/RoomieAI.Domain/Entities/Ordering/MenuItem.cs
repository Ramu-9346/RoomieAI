using RoomieAI.Domain.Common;

namespace RoomieAI.Domain.Entities.Ordering;

public class MenuItem : BaseEntity
{
    public Guid RestaurantId { get; set; }

    public Restaurant Restaurant { get; set; } = null!;

    public Guid? MenuCategoryId { get; set; }

    public MenuCategory? MenuCategory { get; set; }

    public string SwiggyItemId { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public decimal PriceRupees { get; set; }

    public bool IsVeg { get; set; }

    public bool IsAvailable { get; set; } = true;

    public string? ImageUrl { get; set; }
}
