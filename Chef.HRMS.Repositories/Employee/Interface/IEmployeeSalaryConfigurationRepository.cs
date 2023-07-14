namespace Chef.HRMS.Repositories;

public interface IEmployeeSalaryConfigurationRepository : IGenericRepository<EmployeeSalaryConfiguration>
{
    Task<IEnumerable<EmployeeSalaryConfigurationView>> GetSalaryConfigurationByEmployeeId(int employeeId);

    Task<int> DeleteByEmployeeId(int employeeId);
}
