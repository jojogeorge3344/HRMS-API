using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class EmployeeNumberSeriesRepository : GenericRepository<EmployeeNumberSeries>, IEmployeeNumberSeriesRepository
    {
        public EmployeeNumberSeriesRepository(DbSession session) : base(session)
        {
        }

        public async Task<IEnumerable<EmployeeNumberSeries>> GetAllActiveNumberSeries()
        {

                string sql = @"SELECT * FROM employeenumberseries 
                                        WHERE isactive=true";

                return await Connection.QueryAsync<EmployeeNumberSeries>(sql);

        }

        public async Task<IEnumerable<int>> GetAllAssignedNumberSeries()
        {

                string sql = @"SELECT DISTINCT NumberSeriesId FROM JobDetails";

                return await Connection.QueryAsync<int>(sql);

        }
    }
}