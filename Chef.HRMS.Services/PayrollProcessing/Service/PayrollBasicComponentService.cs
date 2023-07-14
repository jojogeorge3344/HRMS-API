using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class PayrollBasicComponentService : AsyncService<PayrollBasicComponent>, IPayrollBasicComponentService
{
    private readonly IPayrollBasicComponentRepository basicComponentRepository;

    public PayrollBasicComponentService(IPayrollBasicComponentRepository basicComponentRepository)
    {
        this.basicComponentRepository = basicComponentRepository;
    }

    public async Task<IEnumerable<EmployeeSalaryConfigurationView>> GetBasicComponentsByPaygroup(int paygoupId, int year, int month)
    {
        return await basicComponentRepository.GetBasicComponentsByPaygroup(paygoupId, year, month);
    }

    public async Task<int> InsertPayrollBasicComponents(IEnumerable<PayrollBasicComponent> payrollBasicComponents)
    {
        return await basicComponentRepository.InsertPayrollBasicComponents(payrollBasicComponents);
    }

    public async Task<IEnumerable<PayrollBasicComponent>> GetPayrollBasicComponentByPayrollProcessingMethodId(int payrollProcessingMethodId)
    {
        return await basicComponentRepository.GetPayrollBasicComponentByPayrollProcessingMethodId(payrollProcessingMethodId);
    }

    public async Task<IEnumerable<PayrollBasicComponent>> GetPayrollBreakUpByEmployeeId(int employeeId, int payrollProcessingMethodId)
    {
        return await basicComponentRepository.GetPayrollBreakUpByEmployeeId(employeeId, payrollProcessingMethodId);
    }

    public async Task<IEnumerable<EmployeeSalaryConfigurationView>> GetPayrollBasicComponentByEmployeeId(int employeeId)
    {
        return await basicComponentRepository.GetPayrollBasicComponentByEmployeeId(employeeId);
    }

    public async Task<int> InsertOrUpdateAsync(IEnumerable<PayrollBasicComponent> payrollBasicComponents)
    {
        return await basicComponentRepository.InsertOrUpdateAsync(payrollBasicComponents);
    }
}
