using Chef.Common.Models;
using Chef.Common.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IStateRepository : IGenericRepository<State>
    {
        Task<IEnumerable<State>> GetAllByCountry(int countryId);
    }
}