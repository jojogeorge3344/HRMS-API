using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services.PayrollProcessing.Interface
{
    public interface ILeaveAccrualService : IAsyncService<LeaveAccrual>
    {
        Task<IEnumerable<LeaveAccrual>> GenerateLeaveAccruals(int paygroupid);
        Task<int> GenerateLeaveAvailed(LeaveAccrual leaveAvailedDetails);
        Task<int> InsertLeaveAccruals(List<LeaveAccrual> leaveAccruals);
        Task<List<LeaveAccrual>> GetGeneratedLeaveAccruals(int paygroupid);
        Task<IEnumerable<AccrualsPrintViewModel>> GetAccrualsByPayrollProcessingId(int payrollProcessingId);
    }
}
