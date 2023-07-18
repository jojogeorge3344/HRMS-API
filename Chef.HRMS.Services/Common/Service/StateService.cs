using Chef.Common.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class StateService : AsyncService<State>, IStateService
{
    private readonly IStateRepository stateRepository;

    public StateService(IStateRepository stateRepository)
    {
        this.stateRepository = stateRepository;
    }
     
    public async Task<IEnumerable<State>> GetAllByCountry(int countryId)
    {
        return await stateRepository.GetAllByCountry(countryId);
    }
}