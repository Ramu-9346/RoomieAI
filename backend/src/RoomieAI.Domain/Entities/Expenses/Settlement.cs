using RoomieAI.Domain.Common;
using RoomieAI.Domain.Entities.Flats;
using RoomieAI.Domain.Enums;

namespace RoomieAI.Domain.Entities.Expenses;

/// <summary>A payment made by one flat member to another to settle outstanding balances.</summary>
public class Settlement : BaseEntity
{
    public Guid FlatId { get; set; }

    public Flat Flat { get; set; } = null!;

    public Guid FromFlatMemberId { get; set; }

    public FlatMember FromMember { get; set; } = null!;

    public Guid ToFlatMemberId { get; set; }

    public FlatMember ToMember { get; set; } = null!;

    public decimal AmountRupees { get; set; }

    public SettlementStatus Status { get; set; } = SettlementStatus.Pending;

    public DateTime? SettledAt { get; set; }

    public ICollection<SettlementExpenseSplit> ExpenseSplits { get; set; } = [];
}
