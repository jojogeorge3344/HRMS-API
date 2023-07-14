namespace Chef.HRMS.Repositories;

public interface ILogPayrollComponentConfigurationRepository : IGenericRepository<LogPayrollComponentConfiguration>
{
    Task<LogPayrollComponentConfiguration> GetPayrollComponentConfigLogDetails(int id);
}
