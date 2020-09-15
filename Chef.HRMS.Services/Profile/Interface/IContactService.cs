using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IContactService : IAsyncService<Contact>
    {
        Task<IEnumerable<Contact>> GetAllByEmployeeId(int employeeId);
    }
}
