using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class LeaveSlabRepository : TenantRepository<LeaveSlab>, ILeaveSlabRepository
    {
        public LeaveSlabRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {

        }
    }
}
