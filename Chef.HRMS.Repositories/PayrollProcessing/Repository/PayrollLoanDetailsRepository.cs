using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Chef.Common.Repositories;
namespace Chef.HRMS.Repositories
{
	public class PayrollLoanDetailsRepository : GenericRepository<PayrollLoanDetails>, IPayrollLoanDetailsRepository
	{
		public PayrollLoanDetailsRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
		{
		}

		public Task<int> BulkInsertAsync(List<PayrollLoanDetails> objs)
		{
			throw new NotImplementedException();
		}

		public Task<int> BulkUpdateAsync(List<PayrollLoanDetails> objs)
		{
			throw new NotImplementedException();
		}

		//public Task<int> InsertAsync(PayrollLoanDetails obj)
		//{
		//	throw new NotImplementedException();
		//}

		public Task<int> UpdateAsync(PayrollLoanDetails obj)
		{
			throw new NotImplementedException();
		}

		Task<IEnumerable<PayrollLoanDetails>> IGenericRepository<PayrollLoanDetails>.GetAllAsync()
		{
			throw new NotImplementedException();
		}

		Task<PayrollLoanDetails> IGenericRepository<PayrollLoanDetails>.GetAsync(int id)
		{
			throw new NotImplementedException();
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
}
