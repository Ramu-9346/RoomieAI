using System.Linq.Expressions;

namespace RoomieAI.Domain.Specifications;

/// <summary>
/// Query-shaping contract for the specification pattern (filter + include + order +
/// paging as one composable object). No concrete specifications exist yet — this
/// phase only establishes the contract; business modules will add specs like
/// <c>ActiveOrdersForFlatSpec</c> as they're built.
/// </summary>
public interface ISpecification<T>
{
    Expression<Func<T, bool>>? Criteria { get; }

    List<Expression<Func<T, object>>> Includes { get; }

    Expression<Func<T, object>>? OrderBy { get; }

    Expression<Func<T, object>>? OrderByDescending { get; }

    int Skip { get; }

    int Take { get; }

    bool IsPagingEnabled { get; }
}
