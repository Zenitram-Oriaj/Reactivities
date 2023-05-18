using Application.Core;
using Persistence;
using Application.Activities;
using Microsoft.EntityFrameworkCore;
using FluentValidation.AspNetCore;
using FluentValidation;

namespace API.Extensions
{
  public static class ApplicationServiceExtensions
  {
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
      // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
      services.AddEndpointsApiExplorer();
      services.AddSwaggerGen();
      services.AddDbContext<DataContext>(opt =>
      {
        opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
      });

      services.AddCors(opt =>
      {
        opt.AddPolicy("CorsPolicy", policy =>
        {
          policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
        });
      });

      services.AddAutoMapper(typeof(MappingProfiles).Assembly);

      services.AddMediatR(opt =>
      {
        opt.RegisterServicesFromAssemblyContaining<List.Handler>();
      });

      services.AddFluentValidationAutoValidation();
      services.AddValidatorsFromAssemblyContaining<Create>();

      return services;
    }
  }
}