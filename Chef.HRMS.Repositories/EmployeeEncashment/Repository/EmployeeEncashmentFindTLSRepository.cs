using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories.EmployeeEncashment
{
    public class EmployeeEncashmentFindTLSRepository : TenantRepository<Chef.HRMS.Models.EmployeeEncashmentFindTLS>, IEmployeeEncashmentFindTLSRepository
    {
        public EmployeeEncashmentFindTLSRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {

        }
    }
}
