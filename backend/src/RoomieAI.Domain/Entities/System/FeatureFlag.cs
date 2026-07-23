using RoomieAI.Domain.Common;
using RoomieAI.Domain.Enums;

namespace RoomieAI.Domain.Entities.System;

public class FeatureFlag : BaseEntity, IAggregateRoot
{
    public string Key { get; set; } = null!;

    public bool IsEnabled { get; set; }

    public FeatureFlagScope Scope { get; set; } = FeatureFlagScope.Global;

    /// <summary>Flat or User id, depending on <see cref="Scope"/>; null when <see cref="Scope"/> is Global.</summary>
    public Guid? ScopeId { get; set; }

    public int RolloutPercentage { get; set; } = 100;
}
