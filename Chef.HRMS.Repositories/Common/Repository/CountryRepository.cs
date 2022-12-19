using Chef.Common.Models;
using Chef.Common.Repositories;
using Microsoft.AspNetCore.Http;

namespace Chef.HRMS.Repositories
{
    public class CountryRepository : TenantRepository<Country>, ICountryRepository
    {
        public CountryRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }
    }
}