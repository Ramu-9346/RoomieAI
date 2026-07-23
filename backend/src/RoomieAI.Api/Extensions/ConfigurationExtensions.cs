using RoomieAI.Api.Configuration;

namespace RoomieAI.Api.Extensions;

public static class ConfigurationExtensions
{
    public static IServiceCollection AddApplicationSettings(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<JwtSettings>(configuration.GetSection(JwtSettings.SectionName));
        services.Configure<ApplicationSettings>(configuration.GetSection(ApplicationSettings.SectionName));

        return services;
    }
}
