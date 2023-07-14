namespace Chef.HRMS.Repositories;

public interface IPayrollAdhocDetailsRepository : IGenericRepository<PayrollAdhocDetails>
{
    Task<int> DeleteByPayrollProcessID(int payrollProcessID);
}
