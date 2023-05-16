using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IBulkUploadRepository : IGenericRepository<Leave>
    {
        Task<int> BulkInsertLeave(IEnumerable<Leave> leave);
        Task<int> BulkInsertWorkFromHome(IEnumerable<WorkFromHome> workFromHome);
        Task<int> BulkInsertOnduty(IEnumerable<OnDuty> onDuty);
        Task<int> BulkInsertRegularLogin(IEnumerable<RegularLogin> regularLogin);
        Task<int> RegularLoginBulkInsert(IEnumerable<RegularLogin> regularLogins);
        Task<bool> GetEmployeeCodeExist(string employeeCode);
        Task<int> BulkInsertSystemVariableValues(IEnumerable<SystemVariableValues> systemVariableValues); 

    }
}
