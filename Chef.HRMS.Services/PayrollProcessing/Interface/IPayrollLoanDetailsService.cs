using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
	public interface IPayrollLoanDetailsService : IAsyncService<PayrollLoanDetails>
	{
		Task<int> BulkInsertAsync(List<PayrollLoanDetails> payrollLoanDetails);
	}
}
