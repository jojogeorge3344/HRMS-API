using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class WorkFromHomeSettingsRepository : GenericRepository<WorkFromHomeSettings>, IWorkFromHomeSettingsRepository
    {
        public WorkFromHomeSettingsRepository(DbSession session) : base(session)
        {
        }

        public async Task<WorkFromHomeSettings> GetTopOneWorkFromHomeSettings()
        {

                var sql = @"SELECT * FROM  workfromhomesettings
                                     LIMIT 1";

                return await Connection.QueryFirstOrDefaultAsync<WorkFromHomeSettings>(sql);
        }
    }
}
