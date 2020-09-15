using Chef.Common.Repositories;
using Chef.HRMS.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace Chef.HRMS.Test
{
    public class BaseTest
    {
        private readonly IHttpContextAccessor context;

        public ConnectionFactory ConnectionFactory
        {
            get
            {
                var configuration = new ConfigurationBuilder().AddJsonFile("appsettings.Development.json").Build();
                return new ConnectionFactory(configuration, context);
            }
        }
    }
}
