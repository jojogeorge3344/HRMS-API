using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class OverTimePolicyConfigurationService : AsyncService<OverTimePolicyConfiguration>, IOverTimePolicyConfigurationService
    {
        private readonly IOverTimePolicyConfigurationRepository overTimePolicyConfigurationRepository;

        public OverTimePolicyConfigurationService(IOverTimePolicyConfigurationRepository overTimePolicyConfigurationRepository)
        {
            this.overTimePolicyConfigurationRepository = overTimePolicyConfigurationRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await overTimePolicyConfigurationRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<int>> GetAllAssignedOverTimePolicies()
        {
            return await overTimePolicyConfigurationRepository.GetAllAssignedOverTimePolicies();
        }

        public async Task<IEnumerable<OverTimePolicyConfiguration>> GetAllAsync()
        {
            return await overTimePolicyConfigurationRepository.GetAllAsync();
        }

        public async Task<OverTimePolicyConfiguration> GetAsync(int id)
        {
            return await overTimePolicyConfigurationRepository.GetAsync(id);
        }

        public async Task<OverTimePolicyConfiguration> GetByOverTimePolicyId(int overTimePolicyId)
        {
            return await overTimePolicyConfigurationRepository.GetByOverTimePolicyId(overTimePolicyId);
        }

        public async Task<OverTimePolicyConfiguration> GetOvertimeConfigurationById(int employeeId)
        {
            return await overTimePolicyConfigurationRepository.GetOvertimeConfigurationById(employeeId);
        }

        public async Task<int> InsertAsync(OverTimePolicyConfiguration OverTimePolicyConfiguration)
        {
            return await overTimePolicyConfigurationRepository.InsertAsync(OverTimePolicyConfiguration);
        }

        public async Task<int> UpdateAsync(OverTimePolicyConfiguration OverTimePolicyConfiguration)
        {
            return await overTimePolicyConfigurationRepository.UpdateAsync(OverTimePolicyConfiguration);
        }
    }
}
