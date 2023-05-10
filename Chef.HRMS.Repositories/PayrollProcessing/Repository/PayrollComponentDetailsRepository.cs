using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Chef.Common.Repositories;

namespace Chef.HRMS.Repositories
{
	public class PayrollComponentDetailsRepository : GenericRepository<PayrollComponentDetails>, IPayrollComponentDetailsRepository
	{
		public PayrollComponentDetailsRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
		{
		}
		public async Task<int> DeleteByPayrollProcessID(int payrollProcessID,int stepNo)
		{
			string sql = @"UPDATE hrms.payrollcomponentdetails 
							SET isarchived = true 
							WHERE payrollprocessid = @payrollProcessID 
							AND processStatus != 1 AND stepno = @stepNo"; // PROCESS STATUS 1 IS PROCESSED
			return await Connection.ExecuteAsync(sql, new { payrollProcessID, stepNo });

		}
	}
}
