using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class EmployeeNumberSeriesRepository : GenericRepository<EmployeeNumberSeries>, IEmployeeNumberSeriesRepository
    {
        public EmployeeNumberSeriesRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<EmployeeNumberSeries>> GetAllActiveNumberSeries()
        {
            using (Connection)
            {
                string sql = @"SELECT * FROM employeenumberseries 
                                        WHERE isactive=true";

                return await Connection.QueryAsync<EmployeeNumberSeries>(sql);
            }
        }

        public async Task<IEnumerable<int>> GetAllAssignedNumberSeries()
        {
            using (Connection)
            {
                string sql = @"SELECT DISTINCT NumberSeriesId FROM JobDetails";

                return await Connection.QueryAsync<int>(sql);
            }
        }
    }
}