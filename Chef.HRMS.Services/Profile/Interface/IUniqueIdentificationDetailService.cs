using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IUniqueIdentificationDetailService : IAsyncService<UniqueIdentificationDetail>
{
    Task<IEnumerable<UniqueIdentificationDetailView>> GetByEmployeeId(int employeeId);
}
