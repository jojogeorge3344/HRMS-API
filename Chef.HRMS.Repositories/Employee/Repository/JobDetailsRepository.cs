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

        public async Task<JobDetailsReportView> GetByEmployeeId(int employeeId)
        {
            var sql = @"SELECT jd.*,jt.name AS jobtitlename,e.firstname AS reportingmanagername
                        FROM hrms.jobdetails jd
                        INNER JOIN hrms.jobtitle jt
                        ON jd.jobtitleid = jt.id
                        INNER JOIN hrms.hrmsemployee e
                        ON e.id = jd.reportingmanager 
                        WHERE employeeid = @employeeId";

            return await Connection.QueryFirstAsync<JobDetailsReportView>(sql, new { employeeId });
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