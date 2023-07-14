namespace Chef.HRMS.Repositories;

public interface IPayrollLoanDetailsRepository : IGenericRepository<PayrollLoanDetails>
{
    Task<int> DeleteByPayrollProcessID(int payrollProcessID);
}
