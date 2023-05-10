using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



namespace Chef.HRMS.Repositories
{
	public class PayrollAdhocDetailsRepository : TenantRepository<PayrollAdhocDetails>, IPayrollAdhocDetailsRepository
	{
		public PayrollAdhocDetailsRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
		{



		}
		public async Task<int> DeleteByPayrollProcessID(int payrollProcessID)
		{
			string sql = @"UPDATE hrms.payrolladhocdetails 
							SET isarchived = false 
							WHERE payrollprocessid = @payrollProcessID 
							AND processStatus != 1"; // PROCESS STATUS 1 IS PROCESSED

			return await Connection.ExecuteAsync(sql, new { payrollProcessID });

		}

		public Task<int> BulkInsertAsync(List<PayrollAdhocDetails> objs)
		{
			throw new NotImplementedException();
		}

		public Task<int> BulkUpdateAsync(List<PayrollAdhocDetails> objs)
		{
			throw new NotImplementedException();
		}

		public Task<int> InsertAsync(PayrollAdhocDetails obj)
		{
			throw new NotImplementedException();
		}

		public Task<int> UpdateAsync(PayrollAdhocDetails obj)
		{
			throw new NotImplementedException();
		}

		Task<IEnumerable<PayrollAdhocDetails>> IGenericRepository<PayrollAdhocDetails>.GetAllAsync()
		{
			throw new NotImplementedException();
		}

		Task<PayrollAdhocDetails> IGenericRepository<PayrollAdhocDetails>.GetAsync(int id)
		{
			throw new NotImplementedException();
		}
	}
}