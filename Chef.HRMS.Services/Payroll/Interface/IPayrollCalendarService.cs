using Chef.Common.Core.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IPayrollCalendarService : IAsyncService<PayrollCalendar>
    {
        Task<bool> IsDuplicateValueExists(string name);
        Task<IEnumerable<int>> GetAllAssignedPayCalendar();
    }
}
