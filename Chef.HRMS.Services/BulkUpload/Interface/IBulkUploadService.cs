using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IBulkUploadService : IAsyncService<Leave>
    {

        Task<int> BulkInsertLeave(IEnumerable<Leave> leave);
        Task<int> BulkInsertWorkFromHome(IEnumerable<WorkFromHome> workFromHome);
        Task<int> BulkInsertOnduty(IEnumerable<OnDuty> onDuty);
        Task<int> BulkInsertRegularLogin(IEnumerable<RegularLogin> regularLogin);
        Task<byte[]> ExportExcelFormat();
        Task<int> RegularLoginBulkInsert(IEnumerable<RegularLogin> regularLogins);
        Task<int> BulkInsertSystemVariableValues(IEnumerable<SystemVariableValues> systemVariableValues);
    }
}
