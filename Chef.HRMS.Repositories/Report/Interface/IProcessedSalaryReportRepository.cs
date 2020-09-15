using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IProcessedSalaryReportRepository : IGenericRepository<ProcessedSalaryDetailsView>
    {
        Task<IEnumerable<ProcessedSalaryDetailsView>> GetProcessedSalaryDetails(int offSet);
    }
}