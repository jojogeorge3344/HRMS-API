namespace Chef.HRMS.Repositories;

public interface IContactRepository : IGenericRepository<Contact>
{
    Task<IEnumerable<Contact>> GetAllByEmployeeId(int employeeId);
}