using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IEmployeeBasicComponentBreakupService : IAsyncService<EmployeeBasicComponentBreakupView>
{
    Task<IEnumerable<EmployeeBasicComponentBreakupView>> GetAllEmployeeBasicComponentBreakupView(int month, int year);
}
