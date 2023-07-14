using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IEmployeeNumberSeriesServices : IAsyncService<EmployeeNumberSeries>
{
    Task<IEnumerable<int>> GetAllAssignedNumberSeries();
    Task<IEnumerable<EmployeeNumberSeries>> GetAllActiveNumberSeries();
}