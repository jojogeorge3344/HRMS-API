using Chef.Common.Core.Services;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IPayrollLeaveDetailsRepository : IGenericRepository<PayrollLeaveDetails>
    {
        Task<int> DeleteByPayrollProcessID(int payrollProcessID);
    }
}
