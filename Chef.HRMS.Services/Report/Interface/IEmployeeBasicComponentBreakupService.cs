using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IEmployeeBasicComponentBreakupService : IAsyncService<EmployeeBasicComponentBreakupView>
    {
        Task<IEnumerable<EmployeeBasicComponentBreakupView>> GetAllEmployeeBasicComponentBreakupView(int month, int year);
    }
}
