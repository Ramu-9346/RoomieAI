using RoomieAI.Domain.Common;
using RoomieAI.Domain.Entities.Flats;
using RoomieAI.Domain.Entities.Identity;
using RoomieAI.Domain.Entities.Ordering;
using RoomieAI.Domain.Enums;

namespace RoomieAI.Domain.Entities.Expenses;

/// <summary>A shared cost outside the Order flow (rent, wifi, cleaning).</summary>
public class Expense : BaseEntity, IAggregateRoot
{
    public Guid FlatId { get; set; }

    public Flat Flat { get; set; } = null!;

    public Guid PaidByUserId { get; set; }

    public User PaidByUser { get; set; } = null!;

    public string Description { get; set; } = null!;

    public decimal AmountRupees { get; set; }

    public ExpenseCategory Category { get; set; }

    public SplitType SplitType { get; set; }

    public DateOnly IncurredAt { get; set; }

    /// <summary>Optional link when an expense originates from a completed group order.</summary>
    public Guid? SourceOrderId { get; set; }

    public Order? SourceOrder { get; set; }

    public ICollection<ExpenseSplit> Splits { get; set; } = [];
}
