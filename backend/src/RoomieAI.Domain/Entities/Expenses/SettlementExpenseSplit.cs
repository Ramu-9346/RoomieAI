using RoomieAI.Domain.Common;

namespace RoomieAI.Domain.Entities.Expenses;

/// <summary>
/// Join entity recording which <see cref="ExpenseSplit"/>s a <see cref="Settlement"/>
/// pays off — a real FK-backed join table rather than an owned list of GUIDs, per the
/// Phase 6 architecture review.
/// </summary>
public class SettlementExpenseSplit : BaseEntity
{
    public Guid SettlementId { get; set; }

    public Settlement Settlement { get; set; } = null!;

    public Guid ExpenseSplitId { get; set; }

    public ExpenseSplit ExpenseSplit { get; set; } = null!;
}
