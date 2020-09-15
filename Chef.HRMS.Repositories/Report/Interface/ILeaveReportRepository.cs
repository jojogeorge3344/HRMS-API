using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface ILeaveReportRepository : IGenericRepository<LeaveReportView>
    {
        Task<IEnumerable<LeaveReportView>> GetLeaveReportDetails(int offSet);
    }
}