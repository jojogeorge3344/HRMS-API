using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class PayrollComponentService : AsyncService<PayrollComponent>, IPayrollComponentService
{
    private readonly IPayrollComponentRepository payrollComponentRepository;

    public PayrollComponentService(IPayrollComponentRepository payrollComponentRepository)
    {
        this.payrollComponentRepository = payrollComponentRepository;
    }

    public async Task<IEnumerable<int>> GetAllAssignedPayrollComponents()
    {
        return await payrollComponentRepository.GetAllAssignedPayrollComponents();
    }

    public async Task<IEnumerable<PayrollComponent>> GetAllOrderByPayrollComponent()
    {
        return await payrollComponentRepository.GetAllOrderByPayrollComponent();
    }

    public async Task<IEnumerable<PayrollComponent>> GetAllPayrollComponentByType(int payrollComponentType)
    {
        return await payrollComponentRepository.GetAllPayrollComponentByType(payrollComponentType);
    }

    public async Task<IEnumerable<BenefitTypes>> GetComponentType()
    {
        return await payrollComponentRepository.GetComponentType();
    }

    public async Task<bool> IsPayrollComponentCodeExist(string code)
    {
        return await payrollComponentRepository.IsPayrollComponentCodeExist(code);
    }
}