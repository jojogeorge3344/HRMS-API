namespace Chef.HRMS.Repositories;

public interface ILeaveAndAttendanceRepository : IGenericRepository<LeaveAndAttendance>
{
    Task<IEnumerable<LeaveAndAttendanceViewModel>> GetAllLeaveAndAttendanceByPaygroup(int paygroupId, DateTime fromDate, DateTime toDate, int payrollProcessId);
    Task<IEnumerable<LeaveDetailsViewModel>> GetAllApprovedLeaveDetailsByEmployeeId(int employeeId, DateTime fromDate, DateTime toDate);
    Task<IEnumerable<LeaveDetailsViewModel>> GetAllUnapprovedLeaveDetailsByEmployeeId(int employeeId, DateTime fromDate, DateTime toDate);
    Task<IEnumerable<DateTime>> GetAllUnmarkedAttendanceDetailsByEmployeeId(int employeeId, DateTime fromDate, DateTime toDate);
    Task<int> GetNumberOfEmployeesByPaygroup(int paygroupId);
    Task<int> InsertLeaveAndAttendanceDetails(IEnumerable<LeaveAndAttendance> leaveAndAttendances);
    Task<IEnumerable<LeaveAndAttendance>> GetLeaveAndAttendanceByPayrollProcessingMethodId(int payrollProcessingMethodId);
    Task<LeaveAndAttendance> GetLeaveAndAttendanceByEmployeeId(int employeeId, int payrollProcessingMethodId);
    Task<IEnumerable<EmployeeAttendanceViewModel>> GetAllLeaveAndAttendanceByEmployeeId(int employeeId, DateTime fromDate, DateTime toDate);
    Task<IEnumerable<LOPCalculationView>> GetLOPCalculation(DateTime fromDate, DateTime toDate);
    Task<IEnumerable<LOPCalculationView>> GetLOPCalculationDetail(int payGroupId, DateTime fromDate, DateTime toDate);
}
