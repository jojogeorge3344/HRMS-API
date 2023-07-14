namespace Chef.HRMS.Repositories;

public interface IAddressRepository : IGenericRepository<Address>
{
    Task<IEnumerable<Address>> GetAllByEmployeeId(int employeeId);
}
