using Chef.Common.Core.Extensions;

namespace Chef.HRMS.Repositories;

public class EmployeeRevisionOldRepository : GenericRepository<EmployeeRevisionOld>, IEmployeeRevisionOldRepository
{
    public EmployeeRevisionOldRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }

    public async Task<EmployeeRevisionOld> GetEmployeeRevisionOld(int employeeRevisionId)
    {
        return await QueryFactory
       .Query<EmployeeRevisionOld>()
       .Where("employeerevisionid", employeeRevisionId)
       .WhereNotArchived()
       .FirstOrDefaultAsync<EmployeeRevisionOld>();
    }
}