using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IEmployeeRevisionBoldService:IBaseService
    {
        Task<IEnumerable<EmployeeRevisionBoldDto>> GetemployeeOldDetailsAsync(int id);
        Task<IEnumerable<EmployeeRevisionBoldDto>> GetemployeeNewDetailsAsync(int id);
        Task<IEnumerable<EmployeeSalarayDto>> GetSalaryOldDetailsAsync(int id);
        Task<IEnumerable<EmployeeSalarayDto>> GetSalaryNewDetailsAsync(int id);

    }
}

