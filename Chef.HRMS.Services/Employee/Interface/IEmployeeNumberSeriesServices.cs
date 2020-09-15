using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IEmployeeNumberSeriesServices : IAsyncService<EmployeeNumberSeries>
    {
        Task<IEnumerable<int>> GetAllAssignedNumberSeries();
        Task<IEnumerable<EmployeeNumberSeries>> GetAllActiveNumberSeries();
    }
}