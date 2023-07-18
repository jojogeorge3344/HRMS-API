using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class ShiftService : AsyncService<Shift>, IShiftService
{
    private readonly IShiftRepository shiftRepository;

    public ShiftService(IShiftRepository shiftRepository)
    {
        this.shiftRepository = shiftRepository;
    }

    public async Task<Shift> GetShiftByEmployeeId(int employeeId)
    {
        return await shiftRepository.GetShiftByEmployeeId(employeeId);
    }

    public async Task<IEnumerable<int>> GetAllAssignedShift()
    {
        return await shiftRepository.GetAllAssignedShift();
    }
}
