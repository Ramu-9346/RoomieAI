namespace RoomieAI.Domain.ValueObjects;

/// <summary>Postal address, owned by <see cref="Entities.Flats.Flat"/>.</summary>
public sealed class Address : ValueObject
{
    public string Line1 { get; private set; } = null!;

    public string? Line2 { get; private set; }

    public string City { get; private set; } = null!;

    public string State { get; private set; } = null!;

    public string PostalCode { get; private set; } = null!;

    public string Country { get; private set; } = "India";

    private Address()
    {
    }

    public Address(string line1, string city, string state, string postalCode, string? line2 = null, string country = "India")
    {
        Line1 = line1;
        Line2 = line2;
        City = city;
        State = state;
        PostalCode = postalCode;
        Country = country;
    }

    protected override IEnumerable<object?> GetEqualityComponents()
    {
        yield return Line1;
        yield return Line2;
        yield return City;
        yield return State;
        yield return PostalCode;
        yield return Country;
    }
}
