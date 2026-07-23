using RoomieAI.Domain.Common;
using RoomieAI.Domain.Entities.Flats;

namespace RoomieAI.Domain.Entities.Expenses;

public class ExpenseSplit : BaseEntity
{
    public Guid ExpenseId { get; set; }

    public Expense Expense { get; set; } = null!;

    public Guid FlatMemberId { get; set; }

    public FlatMember FlatMember { get; set; } = null!;

    public decimal ShareAmountRupees { get; set; }

    /// <summary>Denormalized convenience flag; source of truth is <see cref="Settlement"/>.</summary>
    public bool IsSettled { get; set; }
}
