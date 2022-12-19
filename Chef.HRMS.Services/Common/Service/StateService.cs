using Chef.Common.Core.Services;
using Chef.Common.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class StateService : AsyncService<State>, IStateService
    {
        private readonly IStateRepository stateRepository;

        public StateService(IStateRepository stateRepository)
        {
            this.stateRepository = stateRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await stateRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<State>> GetAllAsync()
        {
            return await stateRepository.GetAllAsync();
        }

        public async Task<IEnumerable<State>> GetAllByCountry(int countryId)
        {
            return await stateRepository.GetAllByCountry(countryId);
        }

        public async Task<State> GetAsync(int id)
        {
            return await stateRepository.GetAsync(id);
        }

        public async Task<int> InsertAsync(State obj)
        {
            return await stateRepository.InsertAsync(obj);
        }

        public async Task<int> UpdateAsync(State obj)
        {
            return await stateRepository.UpdateAsync(obj);
        }
    }
}