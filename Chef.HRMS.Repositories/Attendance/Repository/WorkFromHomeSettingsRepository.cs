using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class WorkFromHomeSettingsRepository : GenericRepository<WorkFromHomeSettings>, IWorkFromHomeSettingsRepository
    {
        public WorkFromHomeSettingsRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<WorkFromHomeSettings> GetTopOneWorkFromHomeSettings()
        {

                var sql = @"SELECT * FROM  hrms.workfromhomesettings
                                     LIMIT 1";

                return await Connection.QueryFirstOrDefaultAsync<WorkFromHomeSettings>(sql);
        }
    }
}
