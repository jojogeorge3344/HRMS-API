using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories.FinalSettlement
{
    public class FinalSettlementFindTLSRepository : TenantRepository<FinalSettlementFindTLS>, IFinalSettlementFindTLSRepository
    {
        public FinalSettlementFindTLSRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {

        }
    }
}
