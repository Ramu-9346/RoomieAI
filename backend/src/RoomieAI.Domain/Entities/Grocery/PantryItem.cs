using RoomieAI.Domain.Common;
using RoomieAI.Domain.Enums;

namespace RoomieAI.Domain.Entities.Grocery;

public class PantryItem : BaseEntity
{
    public Guid PantryId { get; set; }

    public Pantry Pantry { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string? Category { get; set; }

    /// <summary>e.g. "kg", "pack", "L".</summary>
    public string Unit { get; set; } = null!;

    public decimal CurrentQuantity { get; set; }

    public decimal LowStockThreshold { get; set; }

    /// <summary>Recomputed whenever <see cref="CurrentQuantity"/> changes; drives restock alerts.</summary>
    public StockLevel StockLevel { get; set; } = StockLevel.InStock;

    public DateTime? LastPurchasedAt { get; set; }
}
