namespace RoomieAI.Domain.Enums;

public enum FeatureFlagScope
{
    Global = 0,
    Flat = 1,
    User = 2,
}

/// <summary>Typed hint for parsing <see cref="Entities.System.AppSetting.Value"/>.</summary>
public enum AppSettingValueType
{
    String = 0,
    Int = 1,
    Decimal = 2,
    Bool = 3,
    Json = 4,
}
