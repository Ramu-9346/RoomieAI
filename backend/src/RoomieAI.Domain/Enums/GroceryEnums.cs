namespace RoomieAI.Domain.Enums;

public enum StockLevel
{
    InStock = 0,
    Low = 1,
    OutOfStock = 2,
}

public enum GroceryListStatus
{
    Draft = 0,
    Active = 1,
    Ordered = 2,
    Completed = 3,
    Cancelled = 4,
}

public enum GroceryItemStatus
{
    Pending = 0,
    Purchased = 1,
    Removed = 2,
}
