using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IEducationService : IAsyncService<Education>
{
    Task<IEnumerable<EducationView>> GetAllByEmployeeId(int employeeId);
}
