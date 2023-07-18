using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class BranchBankAccountService : AsyncService<HRMSBranchBankAccount>, IBranchBankAccountService
{
    private readonly IBranchBankAccountRepository branchBankAccountRepository;

    public BranchBankAccountService(IBranchBankAccountRepository branchBankAccountRepository)
    {
        this.branchBankAccountRepository = branchBankAccountRepository;
    }

    public new async Task<int> DeleteAsync(int id)
    {
        return await branchBankAccountRepository.DeleteAsync(id);
    }

    public new async Task<IEnumerable<HRMSBranchBankAccount>> GetAllAsync()
    {
        return await branchBankAccountRepository.GetAllAsync();
    }

    public async Task<IEnumerable<HRMSBranchBankAccount>> GetAllByBranch(int branchId)
    {
        return await branchBankAccountRepository.GetAllByBranchAsync(branchId);
    }

    public new async Task<HRMSBranchBankAccount> GetAsync(int id)
    {
        return await branchBankAccountRepository.GetAsync(id);
    }

    public new async Task<int> InsertAsync(HRMSBranchBankAccount BranchBankAccount)
    {
        return await branchBankAccountRepository.InsertAsync(BranchBankAccount);
    }

    public new async Task<int> UpdateAsync(HRMSBranchBankAccount BranchBankAccount)
    {
        return await branchBankAccountRepository.UpdateAsync(BranchBankAccount);
    }
}