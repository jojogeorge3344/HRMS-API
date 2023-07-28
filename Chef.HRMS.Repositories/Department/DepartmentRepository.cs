using Chef.Common.Core.Extensions;

namespace Chef.HRMS.Repositories.Department
{
    public class DepartmentRepository : GenericRepository<Departments>, IDepartmentRepository
    {
        public DepartmentRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {

        }

        public async Task<bool> IsDepartmentCodeExist(string code)
        {
            if (await QueryFactory
           .Query<Departments>()
           .Where("code", code)
           .WhereNotArchived()
           .CountAsync<int>() > 0) 
            return true;
            else return false;
        }
    }
}
