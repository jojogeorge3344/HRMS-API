namespace Chef.HRMS.Repositories;

public interface IShiftRepository : IGenericRepository<Shift>
{
    Task<IEnumerable<int>> GetAllAssignedShift();
    Task<Shift> GetShiftByEmployeeId(int employeeId);
}
