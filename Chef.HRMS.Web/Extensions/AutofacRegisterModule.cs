using Autofac;
using Autofac.Extras.DynamicProxy;
using Chef.Common.Authentication.Extensions;
using Chef.Common.Authentication.Repositories;
using Chef.Common.Core.Extensions;
using Chef.Common.Core.Logging;
using Chef.Common.Core.Repositories;
using Chef.Common.Core.Services;
using Chef.Common.Data;
using Chef.Common.Repositories;
using Chef.HRMS.Repositories;
using Chef.HRMS.Services;

using IConnectionFactory = Chef.Common.Core.Repositories.IConnectionFactory;

namespace Chef.Finance.Web.Extensions;

public class AutofacRegisterModule : Autofac.Module
{
    protected override void Load(ContainerBuilder builder)
    {
        //mandatory registration for framework level components.
        builder.RegisterFrameworkComponents();
        builder.RegisterTenantDBComponents();
        builder.RegisterDataServices();
        builder.RegisterAuthentication();
        builder.RegisterApiServiceComponents();

        //TODO: Depreciated.
        builder.RegisterType<QueryBuilderFactory>().As<IQueryBuilderFactory>().InstancePerLifetimeScope();
        builder.RegisterType<DatabaseSession>().As<IDatabaseSession>().InstancePerLifetimeScope();
        builder.RegisterType<TenantConnectionFactory>().As<IConnectionFactory>().InstancePerLifetimeScope();

        builder.RegisterType<AuthRepository>().As<IAuthRepository>().InstancePerLifetimeScope();
        builder.RegisterType<AuthService>().As<IAuthService>().InstancePerLifetimeScope();
        //Register Services

        //TODO Properties are autowired for the timebeing.
        builder.RegisterAssemblyTypes(typeof(TenantService).Assembly)
            .Where(t => t.IsAssignableTo<IBaseService>())
            .AsImplementedInterfaces()
            .InstancePerLifetimeScope()
            .EnableInterfaceInterceptors()
            .InterceptedBy(typeof(LoggingInterceptor))
            .PropertiesAutowired();

        //Register Repositories
        //Repos will have the Logging Interceptor
        //TODO Properties are autowired for the timebeing.
        //We can avoid the property injection.
         
        builder.RegisterAssemblyTypes(typeof(TenantRepository).Assembly)
            .Where(t => t.IsAssignableTo<IRepository>())
            .AsImplementedInterfaces()
            .InstancePerLifetimeScope()
            .EnableInterfaceInterceptors()

            .InterceptedBy(typeof(LoggingInterceptor))
            .PropertiesAutowired();

        
       

        base.Load(builder);
    }
}

                