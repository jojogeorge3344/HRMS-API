namespace Chef.HRMS.Repositories;

public interface IDependentRepository : IGenericRepository<Dependent>
{
    Task<IEnumerable<Dependent>> GetAllByEmployeeId(int employeeId);
}