using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories.FinalSettlement
{
    public class FinalSettlementDetailsRepository : TenantRepository<FinalSettlementDetails>, IFinalSettlementDetailsRepository
    {
        public FinalSettlementDetailsRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {

        }
    }
}
