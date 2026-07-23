using System.Reflection;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using RoomieAI.Application.Behaviors;

namespace RoomieAI.Application.Extensions;

public static class ServiceCollectionExtensions
{
    /// <summary>
    /// Registers MediatR (scanning this assembly for handlers), the validation
    /// pipeline behavior, FluentValidation validators, and AutoMapper profiles.
    /// No handlers, validators, or profiles exist yet — business modules add them
    /// here as they're built; the scans just pick them up automatically.
    /// </summary>
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        var assembly = Assembly.GetExecutingAssembly();

        services.AddMediatR(cfg =>
        {
            cfg.RegisterServicesFromAssembly(assembly);
            cfg.AddOpenBehavior(typeof(ValidationBehavior<,>));
        });

        services.AddValidatorsFromAssembly(assembly);

        services.AddAutoMapper(assembly);

        return services;
    }
}
