using RoomieAI.Api.Configuration;

namespace RoomieAI.Api.Extensions;

public static class CorsExtensions
{
    public const string PolicyName = "RoomieAIClient";

    public static IServiceCollection AddApplicationCors(this IServiceCollection services, ApplicationSettings settings)
    {
        services.AddCors(options =>
        {
            options.AddPolicy(PolicyName, policy =>
            {
                if (settings.AllowedCorsOrigins.Length > 0)
                {
                    policy.WithOrigins(settings.AllowedCorsOrigins)
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                }
                else
                {
                    // No origins configured (e.g. fresh Development setup) — allow
                    // any origin but without credentials, so it's still safe.
                    policy.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                }
            });
        });

        return services;
    }
}
