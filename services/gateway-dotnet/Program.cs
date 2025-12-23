using Grpc.Net.Client;
using OmniSettle.Gateway.Protos;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOpenApi();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularShell", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseCors("AllowAngularShell");

app.MapGet("/test-compliance", async () =>
{
    // Point to the Java Engine's gRPC port
    using var channel = GrpcChannel.ForAddress("http://localhost:8080");
    var client = new ComplianceService.ComplianceServiceClient(channel);

    var reply = await client.ValidateTransactionAsync(new TransactionRequest
    {
        TransactionId = "TXN-12345",
        Amount = 1000.00,
        Currency = "GBP",
        DestinationCountry = "UK",
        SellerRole = "Merchant"
    });

    return Results.Ok(new
    {
        Status = reply.ComplianceStatus,
        AI_Reasoning = reply.AiReasoning,
        Tax = reply.CalculatedTax
    });
});


app.Run();
