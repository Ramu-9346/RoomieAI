namespace RoomieAI.Domain.Enums;

public enum ExpenseCategory
{
    Food = 0,
    Grocery = 1,
    Utilities = 2,
    Rent = 3,
    Household = 4,
    Other = 5,
}

public enum SplitType
{
    Equal = 0,
    Percentage = 1,
    Exact = 2,
    Shares = 3,
}

public enum SettlementStatus
{
    Pending = 0,
    Confirmed = 1,
    Disputed = 2,
}
