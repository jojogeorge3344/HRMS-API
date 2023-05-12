using Chef.Common.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
	public interface IPayrollComponentDetailsRepository : IAsyncService<PayrollComponentDetails>
    {
        Task<int> BulkInsertAsync(List<PayrollComponentDetails> payrollComponent);
        Task<int> DeleteByPayrollProcessID(int payrollProcessID,int stepNo);
        Task<IEnumerable<PayrollComponentDetails>> GetPayslipYears();

    }
}
