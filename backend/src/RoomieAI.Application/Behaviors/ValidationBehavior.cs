using FluentValidation;
using MediatR;
using RoomieAI.Shared.Exceptions;

namespace RoomieAI.Application.Behaviors;

/// <summary>
/// Runs every registered <see cref="IValidator{T}"/> for the incoming request before
/// the handler executes. No validators are registered yet in this phase — this
/// behavior is wired into the pipeline and is a no-op until business modules add
/// FluentValidation validators for their commands/queries.
/// </summary>
public class ValidationBehavior<TRequest, TResponse>(IEnumerable<IValidator<TRequest>> validators)
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        if (!validators.Any())
        {
            return await next();
        }

        var context = new ValidationContext<TRequest>(request);

        var failures = (await Task.WhenAll(validators.Select(v => v.ValidateAsync(context, cancellationToken))))
            .SelectMany(result => result.Errors)
            .Where(failure => failure is not null)
            .ToList();

        if (failures.Count != 0)
        {
            var errors = failures
                .GroupBy(f => f.PropertyName)
                .ToDictionary(g => g.Key, g => g.Select(f => f.ErrorMessage).ToArray());

            throw new AppValidationException(errors);
        }

        return await next();
    }
}
