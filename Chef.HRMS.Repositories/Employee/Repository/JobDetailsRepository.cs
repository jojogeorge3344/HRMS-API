using Chef.Common.Core.Extensions;

namespace Chef.HRMS.Repositories;

public class JobDetailsRepository : GenericRepository<JobDetails>, IJobDetailsRepository
{
    public JobDetailsRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
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