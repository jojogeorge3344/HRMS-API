using Microsoft.AspNetCore.Http;

namespace Chef.HRMS.Test;

public class BaseTest
{
    private readonly IHttpContextAccessor context;

    //public ConnectionFactory ConnectionFactory
    //{
    //    get
    //    {
    //        var configuration = new ConfigurationBuilder().AddJsonFile("appsettings.Development.json").Build();
    //        return new ConnectionFactory(configuration, context);
    //    }
    //}
}
