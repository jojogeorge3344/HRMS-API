using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
	public interface IPayrollComponentDetailsService : IAsyncService<PayrollComponentDetails>
	{
		Task<int> DeleteByPayrollProcessID(int payrollProcessID,int stepNo);
	}
}
