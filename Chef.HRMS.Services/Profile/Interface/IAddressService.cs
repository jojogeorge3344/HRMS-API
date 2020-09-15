using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IAddressService : IAsyncService<Address>
    {
        Task<IEnumerable<Address>> GetAllByEmployeeId(int employeeId);
    }
}
