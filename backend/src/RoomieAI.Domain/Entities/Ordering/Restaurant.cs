using RoomieAI.Domain.Common;
using RoomieAI.Domain.Enums;

namespace RoomieAI.Domain.Entities.Ordering;

/// <summary>Cached Swiggy catalog data. Read-mostly; refreshed by an Infrastructure sync job.</summary>
public class Restaurant : BaseEntity, IAggregateRoot
{
    public string SwiggyRestaurantId { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string? CuisineTags { get; set; }

    public decimal Rating { get; set; }

    public bool IsOpen { get; set; }

    public int DeliveryEtaMinutes { get; set; }

    public SwiggyServiceType ServiceType { get; set; }

    public ICollection<MenuCategory> Categories { get; set; } = [];

    public ICollection<MenuItem> MenuItems { get; set; } = [];
}
