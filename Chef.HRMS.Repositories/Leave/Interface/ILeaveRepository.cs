namespace Chef.HRMS.Repositories;

public interface ILeaveRepository : IGenericRepository<Leave>
{
    Task<int> InsertNotifyPersonnel(IEnumerable<LeaveNotifyPersonnel> leaveNotifyPersonnel);
    Task<int> UpdateNotifyPersonnel(IEnumerable<LeaveNotifyPersonnel> leaveNotifyPersonnel);

    Task<IEnumerable<LeaveComponentLeaveBalanceViewModel>> GetAllLeaveBalanceById(int employeeId);

    Task<IEnumerable<Leave>> GetAllLeaveDetailsById(int employeeId);
    Task<IEnumerable<Leave>> GetAllUnApprovedLeaveById(int employeeId);
    Task<IEnumerable<LeaveNotificationView>> GetApproverById(int leaveRequestId);
    Task<IEnumerable<LeaveNotifyPersonnel>> GetAllNotifyPersonnelById(int leaveRequestId);
    Task<int> InsertUnmarkedAttendance(IEnumerable<Leave> leave);

    Task<IEnumerable<LeaveSettingsViewModel>> GetAllLeaveSettingsById(int employeeId);
    Task<IEnumerable<Leave>> GetAllLeaveInfoByEmployeeId(int employeeId);
    Task<IEnumerable<Leave>> GetAllLeaveDetails();

}
