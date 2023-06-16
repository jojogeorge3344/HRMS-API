using Chef.HRMS.Models;
using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface ILeaveAccrualRepository : IGenericRepository<LeaveAccrual>
    {
        Task<IEnumerable<LeaveAccrual>> GetProcessedLeaveAccruals(DateTime accrualDate);
        Task<IEnumerable<LeaveAccrual>> GetLeaveAccrualsByPayrollProcessingId(int payrollProcessingId);
        Task<IEnumerable<AccrualsPrintViewModel>> GetAccrualsByPayrollProcessingId(int payrollProcessingId);
    }
}
