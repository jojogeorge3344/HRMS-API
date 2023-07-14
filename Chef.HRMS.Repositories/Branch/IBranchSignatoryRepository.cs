namespace Chef.HRMS.Repositories;

public interface IBranchSignatoryRepository : IGenericRepository<HRMSBranchSignatory>
{
    Task<IEnumerable<HRMSBranchSignatory>> GetAllByBranchAsync(int branchId);
}