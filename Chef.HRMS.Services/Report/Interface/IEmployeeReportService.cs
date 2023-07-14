using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IEmployeeReportService : IAsyncService<EmployeeDetailView>
{
    Task<IEnumerable<EmployeeDetailView>> GetAllEmployeeDetailView(int offSet);
}
