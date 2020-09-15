using Chef.Common.Services;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
   public interface IEmployeeBasicComponentBreakupService : IAsyncService<EmployeeBasicComponentBreakupView>
    {
        Task<IEnumerable<EmployeeBasicComponentBreakupView>> GetAllEmployeeBasicComponentBreakupView(int month, int year);
    }
}
