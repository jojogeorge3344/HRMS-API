namespace Chef.HRMS.Repositories;

public interface IEmployeeSalaryConfigurationDetailsRepository : IGenericRepository<EmployeeSalaryConfigurationDetails>
{
    Task<int> InsertEmployeeSalaryConfigDetails(IEnumerable<EmployeeSalaryConfigurationDetails> employeeSalaryConfigurationDetails);

    Task<int> UpdateEmployeeSalaryConfigDetails(IEnumerable<EmployeeSalaryConfigurationDetails> employeeSalaryConfigurationDetails);

    Task<int> DeleteByEmployeeId(int employeeId);
}
