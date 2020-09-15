using Chef.Common.Models;
using Chef.Common.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IStateService : IAsyncService<State>
    {
        Task<IEnumerable<State>> GetAllByCountry(int countryId);
    }
}