using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class BranchSignatoryService : AsyncService, IBranchSignatoryService
    {
        private readonly IBranchSignatoryRepository branchSignatoryRepository;

        public BranchSignatoryService(IBranchSignatoryRepository branchSignatoryRepository)
        {
            this.branchSignatoryRepository = branchSignatoryRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await branchSignatoryRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<HRMSBranchSignatory>> GetAllAsync()
        {
            return await branchSignatoryRepository.GetAllAsync();
        }

        public async Task<IEnumerable<HRMSBranchSignatory>> GetAllByBranch(int branchId)
        {
            return await branchSignatoryRepository.GetAllByBranchAsync(branchId);
        }

        public async Task<HRMSBranchSignatory> GetAsync(int id)
        {
            return await branchSignatoryRepository.GetAsync(id);
        }

        public async Task<HRMSBranchSignatory> InsertAsync(HRMSBranchSignatory BranchSignatory)
        {
            return await branchSignatoryRepository.InsertAsync(BranchSignatory);
        }

        public async Task<int> UpdateAsync(HRMSBranchSignatory BranchSignatory)
        {
            return await branchSignatoryRepository.UpdateAsync(BranchSignatory);
        }
    }
}