using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IPayGroupService : IAsyncService<PayGroup>
{
    Task<IEnumerable<int>> GetAllAssignedPayGroup();
    Task<IEnumerable<EmployeeView>> GetAllEmployeeByPayGroupId(int paygroupId, int year, int month);
}
