using RoomieAI.Domain.Common;
using RoomieAI.Domain.Enums;

namespace RoomieAI.Domain.Entities.System;

public class AppSetting : BaseEntity, IAggregateRoot
{
    public string Key { get; set; } = null!;

    public string Value { get; set; } = null!;

    public AppSettingValueType ValueType { get; set; } = AppSettingValueType.String;

    public string? Description { get; set; }
}
