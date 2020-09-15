using Chef.Common.Models;
using Chef.Common.Repositories;

namespace Chef.HRMS.Repositories
{
    public class CountryRepository : GenericRepository<Country>, ICountryRepository
    {
        public CountryRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }
    }
}