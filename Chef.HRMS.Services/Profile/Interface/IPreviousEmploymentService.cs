using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IPreviousEmploymentService : IAsyncService<PreviousEmployment>
{
    Task<IEnumerable<PreviousEmploymentView>> GetByEmployeeId(int employeeId);
}
