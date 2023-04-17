using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class BranchBankAccountService : AsyncService<HRMSBranchBankAccount>, IBranchBankAccountService
    {
        private readonly IBranchBankAccountRepository branchBankAccountRepository;

        public BranchBankAccountService(IBranchBankAccountRepository branchBankAccountRepository)
        {
            this.branchBankAccountRepository = branchBankAccountRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await branchBankAccountRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<HRMSBranchBankAccount>> GetAllAsync()
        {
            return await branchBankAccountRepository.GetAllAsync();
        }

        public async Task<IEnumerable<HRMSBranchBankAccount>> GetAllByBranch(int branchId)
        {
            return await branchBankAccountRepository.GetAllByBranchAsync(branchId);
        }

        public async Task<HRMSBranchBankAccount> GetAsync(int id)
        {
            return await branchBankAccountRepository.GetAsync(id);
        }

        public async Task<int> InsertAsync(HRMSBranchBankAccount BranchBankAccount)
        {
            return await branchBankAccountRepository.InsertAsync(BranchBankAccount);
        }

        public async Task<int> UpdateAsync(HRMSBranchBankAccount BranchBankAccount)
        {
            return await branchBankAccountRepository.UpdateAsync(BranchBankAccount);
        }
    }
}