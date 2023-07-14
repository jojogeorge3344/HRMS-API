namespace Chef.HRMS.Repositories;

public interface IAdhocDeductionRepository : IGenericRepository<AdhocDeduction>
{
    Task<IEnumerable<AdhocDeductionView>> GetAllAdhocDeductionByPayrollProcessingMethodId(int payGroupId, string fromDate, string toDate);
    Task<IEnumerable<AdhocDeductionView>> GetEmployeeAdhocDeductionByPayrollProcessingMethodId(int payrollProcessingMethodId);
    Task<IEnumerable<BenefitTypes>> GetBenefitTypes();
    Task<IEnumerable<BenefitTypes>> GetAdhocBfCode();
    Task<IEnumerable<AdhocDeduction>> GetAllAdhocDeductionList();

}
