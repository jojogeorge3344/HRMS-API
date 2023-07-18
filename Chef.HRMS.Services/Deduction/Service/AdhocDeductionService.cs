using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class AdhocDeductionService : AsyncService<AdhocDeduction>, IAdhocDeductionService
{
    private readonly IAdhocDeductionRepository adhocDeductionRepository;

    public AdhocDeductionService(IAdhocDeductionRepository adhocDeductionRepository)
    {
        this.adhocDeductionRepository = adhocDeductionRepository;
    }

    public async Task<IEnumerable<BenefitTypes>> GetAdhocBfCode()
    {
        return await adhocDeductionRepository.GetAdhocBfCode();
    }

    public async Task<IEnumerable<AdhocDeduction>> GetAllAdhocDeductionList()
    {
        return await adhocDeductionRepository.GetAllAdhocDeductionList();
    }

    public async Task<IEnumerable<AdhocDeductionView>> GetAllAdhocDeductionByPayrollProcessingMethodId(int payGroupId, string fromDate, string toDate)
    {
        return await adhocDeductionRepository.GetAllAdhocDeductionByPayrollProcessingMethodId(payGroupId, fromDate, toDate);
    }

    public async Task<IEnumerable<BenefitTypes>> GetBenefitTypes()
    {
        return await adhocDeductionRepository.GetBenefitTypes();
    }

    public async Task<IEnumerable<AdhocDeductionView>> GetEmployeeAdhocDeductionByPayrollProcessingMethodId(int payrollProcessingMethodId)
    {
        return await adhocDeductionRepository.GetEmployeeAdhocDeductionByPayrollProcessingMethodId(payrollProcessingMethodId);
    }
}
