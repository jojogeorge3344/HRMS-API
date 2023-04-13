using Chef.Common.Core.Extensions;
using Chef.Common.Models;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class OverTimePolicySlabRepository : TenantRepository<OverTimeSlab>, IOverTimePolicySlabRepository
    {
        public OverTimePolicySlabRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {

        }

        public async Task<bool> IsOverTimePolicyNameExist(string name)
        {
            if (await QueryFactory
           .Query<OverTimeSlab>()
           .Where("overtimepolicyname", name)
           .WhereNotArchived()
           .CountAsync<int>() > 0) return true;
            else return false;
        }
    }
}
