using HealthChecks.SqlServer;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using RoomieAI.Infrastructure.Persistence;

namespace RoomieAI.Api.Health;

public static class HealthCheckExtensions
{
    public static IServiceCollection AddApplicationHealthChecks(this IServiceCollection services, string connectionString)
    {
        services.AddHealthChecks()
            .AddDbContextCheck<ApplicationDbContext>("dbcontext")
            .AddSqlServer(connectionString, name: "sqlserver");

        return services;
    }

    public static WebApplication MapApplicationHealthChecks(this WebApplication app)
    {
        app.MapHealthChecks("/health", new HealthCheckOptions
        {
            ResponseWriter = WriteHealthCheckResponse,
        });

        return app;
    }

    private static Task WriteHealthCheckResponse(HttpContext context, HealthReport report)
    {
        context.Response.ContentType = "application/json";

        var payload = new
        {
            status = report.Status.ToString(),
            checks = report.Entries.Select(entry => new
            {
                name = entry.Key,
                status = entry.Value.Status.ToString(),
                description = entry.Value.Description,
                durationMs = entry.Value.Duration.TotalMilliseconds,
            }),
            totalDurationMs = report.TotalDuration.TotalMilliseconds,
        };

        return context.Response.WriteAsJsonAsync(payload);
    }
}
