using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class EmployeeSalaryConfigurationService : AsyncService<EmployeeSalaryConfiguration>, IEmployeeSalaryConfigurationService
{
    private readonly IEmployeeSalaryConfigurationRepository employeeSalaryConfigurationRepository;

    public EmployeeSalaryConfigurationService(IEmployeeSalaryConfigurationRepository employeeSalaryConfigurationRepository)
    {
        this.employeeSalaryConfigurationRepository = employeeSalaryConfigurationRepository;
    }

    public async Task<IEnumerable<EmployeeSalaryConfigurationView>> GetSalaryConfigurationByEmployeeId(int employeeId)
    {
        return await employeeSalaryConfigurationRepository.GetSalaryConfigurationByEmployeeId(employeeId);
    }

    public async Task<int> DeleteByEmployeeId(int employeeId)
    {
        return await employeeSalaryConfigurationRepository.DeleteByEmployeeId(employeeId);
    } 
}
