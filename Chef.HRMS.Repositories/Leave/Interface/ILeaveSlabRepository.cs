namespace Chef.HRMS.Repositories;

public interface ILeaveSlabRepository : IGenericRepository<LeaveSlab>
{
    Task<IEnumerable<LeaveSlab>> GetLeaveComponentDetails(int leavecomponentid);
}
