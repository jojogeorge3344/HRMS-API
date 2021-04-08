using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class WorkFromHomeSettingsRepository : GenericRepository<WorkFromHomeSettings>, IWorkFromHomeSettingsRepository
    {
        public WorkFromHomeSettingsRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<WorkFromHomeSettings> GetTopOneWorkFromHomeSettings()
        {
            using (Connection)
            {
                var sql = @"SELECT * FROM  workfromhomesettings
                                     LIMIT 1";

                return await Connection.QueryFirstOrDefaultAsync<WorkFromHomeSettings>(sql);
            }
        }
    }
}
