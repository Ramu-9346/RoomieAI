namespace RoomieAI.Domain.Enums;

public enum AIConversationStatus
{
    Active = 0,
    Archived = 1,
}

public enum AIMessageRole
{
    User = 0,
    Assistant = 1,
    System = 2,
    Tool = 3,
}

/// <summary>
/// The kind of side effect an <see cref="Entities.AI.AIAction"/> proposes against
/// another domain (Order, Expense, GroceryList, Poll, ...).
/// </summary>
public enum AIActionType
{
    CreateOrder = 0,
    AddExpense = 1,
    AddGroceryItem = 2,
    CreatePoll = 3,
    SendReminder = 4,
}

public enum AIActionStatus
{
    Proposed = 0,
    Approved = 1,
    Executed = 2,
    Rejected = 3,
    Failed = 4,
}

public enum AIRecommendationType
{
    Reorder = 0,
    BudgetAlert = 1,
    RestockAlert = 2,
    SettleUpReminder = 3,
}
