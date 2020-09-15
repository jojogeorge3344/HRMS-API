using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IEmployeeNumberSeriesRepository : IGenericRepository<EmployeeNumberSeries>
    {
        Task<IEnumerable<int>> GetAllAssignedNumberSeries();
        Task<IEnumerable<EmployeeNumberSeries>> GetAllActiveNumberSeries();
    }
}