using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
   public interface IEmployeeBasicComponentBreakupRepository : IGenericRepository<EmployeeBasicComponentBreakupView>
    {
        Task<IEnumerable<EmployeeBasicComponentBreakupView>> GetAllEmployeeBasicComponentBreakupView(int month,int year);
    }
}
