using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Chef.HRMS.Models;

namespace Chef.HRMS.Services
{
	public interface IPayrollAdhocDetailsService :IAsyncService<PayrollAdhocDetails>
	{
		Task<int> BulkInsertAsync(List<PayrollAdhocDetails> payrollAdhocDetails);
	}
}
