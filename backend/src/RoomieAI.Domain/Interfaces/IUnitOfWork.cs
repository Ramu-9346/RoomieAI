using RoomieAI.Domain.Common;

namespace RoomieAI.Domain.Interfaces;

/// <summary>
/// Coordinates one transactional unit of work across however many repositories a
/// use case touches, and commits them together via a single <c>SaveChangesAsync</c>.
/// </summary>
public interface IUnitOfWork : IDisposable
{
    IGenericRepository<T> Repository<T>() where T : BaseEntity, IAggregateRoot;

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);

    Task BeginTransactionAsync(CancellationToken cancellationToken = default);

    Task CommitTransactionAsync(CancellationToken cancellationToken = default);

    Task RollbackTransactionAsync(CancellationToken cancellationToken = default);
}
