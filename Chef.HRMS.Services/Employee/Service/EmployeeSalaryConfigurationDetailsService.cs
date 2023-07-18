using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class EmployeeSalaryConfigurationDetailsService : AsyncService<EmployeeSalaryConfigurationDetails>, IEmployeeSalaryConfigurationDetailsService
{
    private readonly IEmployeeSalaryConfigurationDetailsRepository employeeSalaryConfigurationDetailsRepository;

    public EmployeeSalaryConfigurationDetailsService(IEmployeeSalaryConfigurationDetailsRepository employeeSalaryConfigurationDetailsRepository)
    {
        this.employeeSalaryConfigurationDetailsRepository = employeeSalaryConfigurationDetailsRepository;
    }

    public async Task<int> InsertEmployeeSalaryConfigDetails(IEnumerable<EmployeeSalaryConfigurationDetails> employeeSalaryConfigurationDetails)
    {
        return await employeeSalaryConfigurationDetailsRepository.InsertEmployeeSalaryConfigDetails(employeeSalaryConfigurationDetails);
    }

    public async Task<int> UpdateEmployeeSalaryConfigDetails(IEnumerable<EmployeeSalaryConfigurationDetails> employeeSalaryConfigurationDetails)
    {
        return await employeeSalaryConfigurationDetailsRepository.UpdateEmployeeSalaryConfigDetails(employeeSalaryConfigurationDetails);
    }

    public async Task<int> DeleteByEmployeeId(int employeeId)
    {
        return await employeeSalaryConfigurationDetailsRepository.DeleteByEmployeeId(employeeId);
    }
}
