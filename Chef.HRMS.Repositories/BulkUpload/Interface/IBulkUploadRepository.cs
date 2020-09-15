using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IBulkUploadRepository : IGenericRepository<Leave>
    {
        Task<int> BulkInsertLeave(IEnumerable<Leave> leave);
        Task<int> BulkInsertWorkFromHome(IEnumerable<WorkFromHome> workFromHome);
        Task<int> BulkInsertOnduty(IEnumerable<OnDuty> onDuty);
        Task<int> BulkInsertRegularLogin(IEnumerable<RegularLogin> regularLogin);
    }
}
