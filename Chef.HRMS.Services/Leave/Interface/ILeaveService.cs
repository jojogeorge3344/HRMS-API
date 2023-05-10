using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface ILeaveService : IAsyncService<Leave>
    {
        Task<int> InsertNotifyPersonnel(IEnumerable<LeaveNotifyPersonnel> leaveNotifyPersonnel);

        Task<IEnumerable<LeaveComponentLeaveBalanceViewModel>> GetAllLeaveBalanceById(int employeeId);

        Task<IEnumerable<Leave>> GetAllLeaveDetailsById(int employeeId);
        Task<IEnumerable<LeaveNotificationView>> GetApproverById(int leaveRequestId);

        Task<IEnumerable<Leave>> GetAllUnApprovedLeaveById(int employeeId);
        Task<IEnumerable<LeaveNotifyPersonnel>> GetAllNotifyPersonnelById(int leaveRequestId);
        Task<int> InsertUnmarkedAttendance(IEnumerable<Leave> leave);

        Task<IEnumerable<LeaveSettingsViewModel>> GetAllLeaveSettingsById(int employeeId);
        Task<IEnumerable<Leave>> GetAllLeaveInfoByEmployeeId(int employeeId);
        Task <int> UpdateNotifyPersonnel(IEnumerable<LeaveNotifyPersonnel> leaveNotifyPersonnel);
    }
}
