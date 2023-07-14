namespace Chef.HRMS.Repositories;

public interface IPANRepository : IGenericRepository<PAN>
{
    Task<IEnumerable<PANView>> GetByEmployeeId(int employeeId);
}