using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class BranchService : AsyncService<HRMSBranch>, IBranchService
    {
        private readonly IBranchRepository branchRepository;

        public BranchService(IBranchRepository branchRepository)
        {
            this.branchRepository = branchRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await branchRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<HRMSBranch>> GetAllAsync()
        {
            return await branchRepository.GetAllAsync();
        }

        public async Task<HRMSBranch> GetAsync(int id)
        {
            return await branchRepository.GetAsync(id);
        }

        public async Task<int> InsertAsync(HRMSBranch branch)
        {
            return await branchRepository.InsertAsync(branch);
        }

        public async Task<int> UpdateAsync(HRMSBranch branch)
        {
            return await branchRepository.UpdateAsync(branch);
        }
    }
}