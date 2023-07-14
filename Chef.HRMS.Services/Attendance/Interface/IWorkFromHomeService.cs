using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IWorkFromHomeService : IAsyncService<WorkFromHome>
{
    Task<int> InsertNotifyPersonnel(IEnumerable<WorkFromHomeNotifyPersonnel> workFromHomeNotifyPersonnel);
    Task<WorkFromHomeView> GetTotalRequestedDaysById(int employeeId);
    Task<IEnumerable<WorkFromHome>> GetAllWorkFromHomeById(int employeeId);
}
