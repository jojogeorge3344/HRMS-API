using Chef.Common.Models;

namespace Chef.HRMS.Services;

public interface IStateService : IAsyncService<State>
{
    Task<IEnumerable<State>> GetAllByCountry(int countryId);
}