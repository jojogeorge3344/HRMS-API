using Chef.Common.Authentication;
using Chef.Common.Authentication.Controllers;
using Chef.Common.Authentication.Extensions;
using Chef.Common.Authentication.Models;
using Chef.Common.Core;
using Chef.Common.Data.Controller;
using Chef.Common.Exceptions;
using Chef.Common.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Serilog;
using System.Linq;

namespace Chef.HRMS.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;


            //replace default logger with serilog.
            Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(configuration)
                .CreateLogger();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddHttpContextAccessor();
            services.Configure<JwtConfigOptions>(Configuration.GetSection(JwtConfigOptions.JwtConfig));

            services
                .AddControllersWithViews(c =>
                {
                    c.Conventions.Add(new ApiExplorerIgnores());
                })
                .AddApplicationPart(typeof(AuthController).Assembly)
                .AddApplicationPart(typeof(CommonDataController).Assembly)
                .AddControllersAsServices()
                .AddNewtonsoftJson();

            services.AddRazorPages();
            services.AddSingleton(Configuration);

            services.AddTenantIdentity(Configuration); 

            services.AddCors();
            //services.AddSwaggerGen();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
                c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
            });

            services.AddResponseCompression(options =>
            {
                options.EnableForHttps = true;
            });

            services.AddControllersWithViews();

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
  
            services.Configure<EmailSettings>(Configuration.GetSection("EmailSettings"));
            services.AddSingleton<IEmailSendFactory, EmailSendFactory>();
        }
         


        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //TODO move this licese to config.
            //Bold.Licensing.BoldLicenseProvider.RegisterLicense("OYq82nhpuBGYXWI9IKoTj3VYPtqt7HqK69ewJyAWLOE=");

            HttpHelper.Configure(app.ApplicationServices.GetRequiredService<IHttpContextAccessor>());

            
            
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseMiddleware(typeof(ErrorHandler));
            app.UseMiddleware(typeof(JwtMiddleware));

            // Write streamlined request completion events, instead of the more verbose ones from the framework.
            // To use the default framework request logging instead, remove this line and set the "Microsoft"
            // level in appsettings.json to "Information".
            app.UseSerilogRequestLogging();

            if (env.IsDevelopment())
            {
                // Register the Swagger generator and the Swagger UI middlewares
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();
            app.UseAuthorization();
            app.UseCors(options =>
                options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseResponseCompression();
        }

        public class ApiExplorerIgnores : IActionModelConvention
        {
            public void Apply(ActionModel action)
            {
                if (action.Controller.ControllerName.Contains("Report"))
                    action.ApiExplorer.IsVisible = false;
            }
        }
    }
}
