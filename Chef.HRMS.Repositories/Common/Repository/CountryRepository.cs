using Chef.Common.Models;
using Chef.Common.Repositories;
using Microsoft.AspNetCore.Http;

namespace Chef.HRMS.Repositories
{
    public class CountryRepository : GenericRepository<Country>, ICountryRepository
    {
        public CountryRepository(IHttpContextAccessor httpContextAccessor, DbSession session) : base(httpContextAccessor, session)
        {
        }
    }
}