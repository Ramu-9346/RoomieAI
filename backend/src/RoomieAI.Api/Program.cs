using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Diagnostics;
using RoomieAI.Api.Configuration;
using RoomieAI.Api.Extensions;
using RoomieAI.Api.Health;
using RoomieAI.Api.Middleware;
using RoomieAI.Api.Swagger;
using RoomieAI.Application.Extensions;
using RoomieAI.Infrastructure.Extensions;

var builder = WebApplication.CreateBuilder(args);

// ── Configuration ────────────────────────────────────────────────────────────
builder.Services.AddApplicationSettings(builder.Configuration);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' is not configured.");

// ── Logging ──────────────────────────────────────────────────────────────────
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();
if (!builder.Environment.IsDevelopment())
{
    builder.Logging.AddEventSourceLogger();
}

// ── Layers ───────────────────────────────────────────────────────────────────
builder.Services.AddInfrastructure(builder.Configuration, builder.Environment.IsDevelopment());
builder.Services.AddApplication();

// ── Web / API ────────────────────────────────────────────────────────────────
builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    });

builder.Services.AddProblemDetails();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();

builder.Services.AddSwaggerDocumentation();
builder.Services.AddApplicationHealthChecks(connectionString);

var applicationSettings = builder.Configuration
    .GetSection(ApplicationSettings.SectionName)
    .Get<ApplicationSettings>() ?? new ApplicationSettings();
builder.Services.AddApplicationCors(applicationSettings);

var app = builder.Build();

// ── Pipeline ─────────────────────────────────────────────────────────────────
app.UseExceptionHandler();

if (app.Environment.IsDevelopment())
{
    app.UseSwaggerDocumentation();
}

app.UseHttpsRedirection();

app.UseCors(CorsExtensions.PolicyName);

app.UseAuthorization();

app.MapControllers();
app.MapApplicationHealthChecks();

app.Run();

// Exposed for WebApplicationFactory-based integration tests.
public partial class Program;
