using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IEmployeeRevisionBoldReportRepository:IBaseRepository
    {
        Task<IEnumerable<EmployeeRevisionBoldDto>> GetemployeeOldDetailsAsync(int id);
    }
}

