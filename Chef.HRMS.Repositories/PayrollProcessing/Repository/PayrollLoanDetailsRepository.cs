namespace Chef.HRMS.Repositories;

public class PayrollLoanDetailsRepository : GenericRepository<PayrollLoanDetails>, IPayrollLoanDetailsRepository
{
    public PayrollLoanDetailsRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {

    }

    public async Task<int> DeleteByPayrollProcessID(int payrollProcessID)
    {
        string sql = @"UPDATE hrms.payrollloandetails 
							SET isarchived = true 
							WHERE payrollprocessid = @payrollProcessID 
							AND processStatus != 1"; // PROCESS STATUS 1 IS PROCESSED
        return await Connection.ExecuteAsync(sql, new { payrollProcessID });
    }
}
