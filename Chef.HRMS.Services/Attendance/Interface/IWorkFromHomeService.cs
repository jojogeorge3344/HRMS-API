using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IWorkFromHomeService : IAsyncService<WorkFromHome>
    {
        Task<int> InsertNotifyPersonnel(IEnumerable<WorkFromHomeNotifyPersonnel> workFromHomeNotifyPersonnel);
        Task<WorkFromHomeView> GetTotalRequestedDaysById(int employeeId);
        Task<IEnumerable<WorkFromHome>> GetAllWorkFromHomeById(int employeeId);
    }
}
