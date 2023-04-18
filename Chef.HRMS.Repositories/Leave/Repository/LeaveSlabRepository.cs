using Chef.Common.Core.Extensions;
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

        public async Task<IEnumerable<LeaveSlab>> GetLeaveComponentDetails(int payrollcomponentid)
        {
            return await QueryFactory
                .Query<LeaveSlab>()
                .Where("leavecomponentid", payrollcomponentid)
                .WhereNotArchived()
                .OrderBy("id")
                .GetAsync<LeaveSlab>();
        }
    }
}
