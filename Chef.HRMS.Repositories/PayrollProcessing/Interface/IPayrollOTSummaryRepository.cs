using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
	public interface IPayrollOTSummaryRepository : IGenericRepository<PayrollOTSummary>
	{
		Task<int> DeleteByPayrollProcessID(int payrollProcessID);
	}
}
