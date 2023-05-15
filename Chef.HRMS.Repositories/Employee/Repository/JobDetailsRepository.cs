using Chef.Common.Core.Extensions;
using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Microsoft.AspNetCore.Http;

namespace Chef.HRMS.Repositories
{
    public class JobDetailsRepository : GenericRepository<JobDetails>, IJobDetailsRepository
    {
        public JobDetailsRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<JobDetails> GetByEmployeeId(int employeeId)
        {
            var sql = @"SELECT * FROM hrms.jobdetails where employeeid = @employeeId";

            return await Connection.QueryFirstAsync<JobDetails>(sql, new { employeeId });
        }

        public async Task<IEnumerable<GroupCategory>> GetGroupCategory()
        {
            var sql = @"SELECT*FROM hrms.category WHERE isarchived=false";   

            return await Connection.QueryAsync<GroupCategory>(sql);
        }

        public async Task<IEnumerable<EmployeeDefaults>> GetProbationDetails()
        {
            return await QueryFactory
            .Query<EmployeeDefaults>()
            .WhereNotArchived()
            .GetAsync<EmployeeDefaults>();
        }
    }
}