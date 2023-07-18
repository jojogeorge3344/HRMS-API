using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class PayrollStructureService : AsyncService<PayrollStructure>, IPayrollStructureService
{
    private readonly IPayrollStructureRepository payrollStructureRepository;

    public PayrollStructureService(IPayrollStructureRepository payrollStructureRepository)
    {
        this.payrollStructureRepository = payrollStructureRepository;
    }

    public async Task<IEnumerable<SystemVariable>> GetAllActived(int payrollstructureid)
    {
        return await payrollStructureRepository.GetAllActived(payrollstructureid);
    }

    public async Task<IEnumerable<int>> GetAllAssignedPayrollStructure()
    {
        return await payrollStructureRepository.GetAllAssignedPayrollStructure();

    }

    public async Task<IEnumerable<PayrollStructure>> GetAllConfiguredPayrollStructures()
    {
        return await payrollStructureRepository.GetAllConfiguredPayrollStructures();
    }

    public async Task<int> UpdatePayrollStructure(int id, bool isConfigured)
    {
        return await payrollStructureRepository.UpdatePayrollStructure(id, isConfigured);
    }
}