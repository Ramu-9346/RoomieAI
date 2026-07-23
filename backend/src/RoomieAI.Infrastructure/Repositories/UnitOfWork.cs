using Microsoft.EntityFrameworkCore.Storage;
using RoomieAI.Domain.Common;
using RoomieAI.Domain.Interfaces;
using RoomieAI.Infrastructure.Persistence;

namespace RoomieAI.Infrastructure.Repositories;

public class UnitOfWork(ApplicationDbContext dbContext) : IUnitOfWork
{
    private readonly Dictionary<Type, object> _repositories = [];
    private IDbContextTransaction? _currentTransaction;
    private bool _disposed;

    public IGenericRepository<T> Repository<T>() where T : BaseEntity, IAggregateRoot
    {
        if (_repositories.TryGetValue(typeof(T), out var existing))
        {
            return (IGenericRepository<T>)existing;
        }

        var repository = new GenericRepository<T>(dbContext);
        _repositories[typeof(T)] = repository;
        return repository;
    }

    public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default) =>
        dbContext.SaveChangesAsync(cancellationToken);

    public async Task BeginTransactionAsync(CancellationToken cancellationToken = default) =>
        _currentTransaction = await dbContext.Database.BeginTransactionAsync(cancellationToken);

    public async Task CommitTransactionAsync(CancellationToken cancellationToken = default)
    {
        if (_currentTransaction is null)
        {
            return;
        }

        try
        {
            await dbContext.SaveChangesAsync(cancellationToken);
            await _currentTransaction.CommitAsync(cancellationToken);
        }
        finally
        {
            await _currentTransaction.DisposeAsync();
            _currentTransaction = null;
        }
    }

    public async Task RollbackTransactionAsync(CancellationToken cancellationToken = default)
    {
        if (_currentTransaction is null)
        {
            return;
        }

        try
        {
            await _currentTransaction.RollbackAsync(cancellationToken);
        }
        finally
        {
            await _currentTransaction.DisposeAsync();
            _currentTransaction = null;
        }
    }

    public void Dispose()
    {
        if (_disposed)
        {
            return;
        }

        _currentTransaction?.Dispose();
        dbContext.Dispose();
        _disposed = true;
        GC.SuppressFinalize(this);
    }
}
