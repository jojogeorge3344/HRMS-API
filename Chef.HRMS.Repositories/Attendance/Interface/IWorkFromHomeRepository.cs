namespace Chef.HRMS.Repositories;

public interface IWorkFromHomeRepository : IGenericRepository<WorkFromHome>
{
    Task<int> InsertNotifyPersonnel(IEnumerable<WorkFromHomeNotifyPersonnel> workFromHomeNotifyPersonnel);
    Task<WorkFromHomeView> GetTotalRequestedDaysById(int employeeId);
    Task<IEnumerable<WorkFromHome>> GetAllWorkFromHomeById(int employeeId);
}
