using Chef.Common.Models;
using Chef.Common.Repositories;
using Microsoft.AspNetCore.Http;

namespace Chef.HRMS.Repositories
{
    public class CountryRepository : ConsoleRepository<Country>, ICountryRepository
    {
        public CountryRepository(IHttpContextAccessor httpContextAccessor, IConsoleConnectionFactory session) : base(httpContextAccessor, session)
        {
        }
    }
}