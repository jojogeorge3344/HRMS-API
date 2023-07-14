using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IShiftService : IAsyncService<Shift>
{
    Task<IEnumerable<int>> GetAllAssignedShift();
    Task<Shift> GetShiftByEmployeeId(int employeeId);
}
