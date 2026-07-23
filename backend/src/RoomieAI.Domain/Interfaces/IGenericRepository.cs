using System.Linq.Expressions;
using RoomieAI.Domain.Common;

namespace RoomieAI.Domain.Interfaces;

/// <summary>
/// Data-access contract for a single aggregate root type. Deliberately free of any
/// business logic — filtering, ordering, and shaping belong to the caller
/// (Application layer) via the <paramref name="predicate"/>/<paramref name="orderBy"/>
/// arguments, not to the repository itself.
/// </summary>
public interface IGenericRepository<T> where T : BaseEntity, IAggregateRoot
{
    Task<T?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

    Task<IReadOnlyList<T>> GetAllAsync(CancellationToken cancellationToken = default);

    Task<IReadOnlyList<T>> FindAsync(
        Expression<Func<T, bool>> predicate,
        CancellationToken cancellationToken = default);

    Task<T?> SingleOrDefaultAsync(
        Expression<Func<T, bool>> predicate,
        CancellationToken cancellationToken = default);

    /// <summary>Filtering- and pagination-ready read for list endpoints.</summary>
    Task<(IReadOnlyList<T> Items, int TotalCount)> GetPagedAsync(
        int pageNumber,
        int pageSize,
        Expression<Func<T, bool>>? predicate = null,
        Expression<Func<T, object>>? orderBy = null,
        bool orderByDescending = false,
        CancellationToken cancellationToken = default);

    Task<bool> ExistsAsync(Expression<Func<T, bool>> predicate, CancellationToken cancellationToken = default);

    Task<int> CountAsync(Expression<Func<T, bool>>? predicate = null, CancellationToken cancellationToken = default);

    Task AddAsync(T entity, CancellationToken cancellationToken = default);

    Task AddRangeAsync(IEnumerable<T> entities, CancellationToken cancellationToken = default);

    void Update(T entity);

    /// <summary>Soft-deletes: sets <see cref="BaseEntity.IsDeleted"/>, does not remove the row.</summary>
    void Delete(T entity);

    void HardDelete(T entity);
}
