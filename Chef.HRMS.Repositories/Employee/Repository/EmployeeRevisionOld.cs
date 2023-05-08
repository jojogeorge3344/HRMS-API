using Chef.Common.Core.Extensions;
using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks; 

namespace Chef.HRMS.Repositories
{
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
}