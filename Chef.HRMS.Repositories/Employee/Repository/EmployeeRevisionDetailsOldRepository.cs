using Chef.Common.Core.Extensions;
using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks; 

namespace Chef.HRMS.Repositories
{
    public class EmployeeRevisionDetailsOldRepository : GenericRepository<EmployeeRevisionDetailsOld>, IEmployeeRevisionDetailsOldRepository
    {
        public EmployeeRevisionDetailsOldRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }
  
    }
}