using Chef.Common.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
	public interface IPayrollComponentDetailsRepository : IGenericRepository<PayrollComponentDetails>
	{
		Task<int> DeleteByPayrollProcessID(int payrollProcessID,int stepNo);
	}
}
