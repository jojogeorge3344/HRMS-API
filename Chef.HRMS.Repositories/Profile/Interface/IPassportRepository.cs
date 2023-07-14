namespace Chef.HRMS.Repositories;

public interface IPassportRepository : IGenericRepository<Passport>
{
    Task<IEnumerable<PassportView>> GetByEmployeeId(int employeeId);
}