using Microsoft.EntityFrameworkCore;
using SimpleInventory.Data;

var builder = WebApplication.CreateBuilder(args);

// --- START: MODIFIED CORS CONFIGURATION ---
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy  =>
                      {
                          policy.WithOrigins("http://localhost:5181",    // Your backend's own HTTP URL
                                             "https://localhost:7181",   // Your backend's own HTTPS URL (check launchSettings.json)
                                             "http://127.0.0.1:5181",    // Backend with 127.0.0.1
                                             "null",                     // Still good to have for file:// fallback (though less likely now)
                                             "http://127.0.0.1:5500")    // <<< ADD THIS LINE FOR YOUR FRONTEND SERVER
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});
// --- END: MODIFIED CORS CONFIGURATION ---


// Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseInMemoryDatabase("SimpleInventoryDb"));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins); // This line must be present and correctly placed

app.UseAuthorization();

app.MapControllers();

app.Run();