using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class EmployeeNumberSeriesRepository : GenericRepository<EmployeeNumberSeries>, IEmployeeNumberSeriesRepository
    {
        public EmployeeNumberSeriesRepository(IHttpContextAccessor httpContextAccessor, DbSession session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<EmployeeNumberSeries>> GetAllActiveNumberSeries()
        {

                string sql = @"SELECT * FROM hrms.employeenumberseries 
                                        WHERE isactive=true";

                return await Connection.QueryAsync<EmployeeNumberSeries>(sql);

        }

        public async Task<IEnumerable<int>> GetAllAssignedNumberSeries()
        {

                string sql = @"SELECT DISTINCT hrms.NumberSeriesId FROM JobDetails";

                return await Connection.QueryAsync<int>(sql);

        }
    }
}