using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IAddressService : IAsyncService<Address>
{
    Task<IEnumerable<Address>> GetAllByEmployeeId(int employeeId);
}
