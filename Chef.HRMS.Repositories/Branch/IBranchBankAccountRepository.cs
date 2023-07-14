namespace Chef.HRMS.Repositories;

public interface IBranchBankAccountRepository : IGenericRepository<HRMSBranchBankAccount>
{
    Task<IEnumerable<HRMSBranchBankAccount>> GetAllByBranchAsync(int branchId);
}