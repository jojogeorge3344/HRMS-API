namespace Chef.HRMS.Repositories;

public class PayrollOTSummaryRepository : GenericRepository<PayrollOTSummary>, IPayrollOTSummaryRepository
{
    public PayrollOTSummaryRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }



    public Task<int> BulkUpdateAsync(List<PayrollOTSummary> objs)
    {
        throw new NotImplementedException();
    }

    public async Task<int> DeleteByPayrollProcessID(int payrollProcessID)
    {
        string sql = @"UPDATE hrms.payrollotsummary
							SET isarchived = true 
							WHERE payrollprocessid = @payrollProcessID 
							AND processStatus != 1"; // PROCESS STATUS 1 IS PROCESSED
        await Connection.ExecuteAsync(sql, new { payrollProcessID });
        sql = @"UPDATE hrms.payrollotdetails SET isarchived = true 
					WHERE payrollotsummaryid in(SELECT id FROM
							hrms.payrollotsummary 
							WHERE payrollprocessid = @payrollProcessID 
							AND processStatus != 1)";

        return await Connection.ExecuteAsync(sql, new { payrollProcessID });

    }



    public Task<int> UpdateAsync(PayrollOTSummary obj)
    {
        throw new NotImplementedException();
    }

    Task<IEnumerable<PayrollOTSummary>> IGenericRepository<PayrollOTSummary>.GetAllAsync()
    {
        throw new NotImplementedException();
    }

    Task<PayrollOTSummary> IGenericRepository<PayrollOTSummary>.GetAsync(int id)
    {
        throw new NotImplementedException();
    }
}
