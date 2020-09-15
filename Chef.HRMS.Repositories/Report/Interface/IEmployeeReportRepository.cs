using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IEmployeeReportRepository : IGenericRepository<EmployeeDetailView>
    {
        Task<IEnumerable<EmployeeDetailView>> GetAllEmployeeDetailView(int offSet);

    }
}
