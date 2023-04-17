using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class JobFilingRepository : GenericRepository<JobFiling>, IJobFilingRepository
    {
        public JobFilingRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<int> GetWeekendPolicyById(int employeeId)
        {

                string sql = @"SELECT weekoff FROM hrms.jobfiling where employeeid=@employeeid";

                return await Connection.QueryFirstOrDefaultAsync<int>(sql, new { employeeId });
        }
    }
}