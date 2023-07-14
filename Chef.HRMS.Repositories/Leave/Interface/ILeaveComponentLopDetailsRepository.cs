namespace Chef.HRMS.Repositories;

public interface ILeaveComponentLopDetailsRepository : IGenericRepository<LeaveComponentLopDetails>
{
    Task<IEnumerable<LeaveComponentLopDetails>> GetDetailsByLeaveComponentId(int leaveComponentId);
    Task<int> DeleteByLeaveComponentId(int leaveComponentId);
}
