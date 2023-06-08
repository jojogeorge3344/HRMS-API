using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services.Report
{
    public interface IEmployeeRevisionBoldService : IBaseService
    {
        Task<EmployeeRevisionOldDetailsBoldDto> GetemployeeOldDetailsAsync(int id);
        Task<EmployeeRevisionNewDetailsBoldDto> GetemployeeNewDetailsAsync(int id);
        Task<IEnumerable<EmployeeSalarayDto>> GetSalaryOldDetailsAsync(int id);
        Task<IEnumerable<EmployeeSalarayDto>> GetSalaryNewDetailsAsync(int id);

    }
}

