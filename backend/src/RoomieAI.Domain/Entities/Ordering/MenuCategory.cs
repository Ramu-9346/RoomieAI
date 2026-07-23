using RoomieAI.Domain.Common;

namespace RoomieAI.Domain.Entities.Ordering;

public class MenuCategory : BaseEntity
{
    public Guid RestaurantId { get; set; }

    public Restaurant Restaurant { get; set; } = null!;

    public string Name { get; set; } = null!;

    public int SortOrder { get; set; }

    public ICollection<MenuItem> Items { get; set; } = [];
}
