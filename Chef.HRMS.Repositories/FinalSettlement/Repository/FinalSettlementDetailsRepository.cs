using Chef.Common.Core.Extensions;
using Chef.HRMS.Models;
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

        public async Task<int> DeleteByFinalSettlementId(int finalSettlementId)
        {
            return await QueryFactory
            .Query<FinalSettlementDetails>()
            .Where("finalsettlementid", finalSettlementId)
            .DeleteAsync();
        }

        public async Task<IEnumerable<FinalSettlementDetails>> GetFinalSettlementDetailsByFinalSettlementId(int id)
        {
            return await QueryFactory
           .Query<FinalSettlementDetails>()
           .Where("finalsettlementid", id)
           .WhereNotArchived()
           .GetAsync<FinalSettlementDetails>();
        }
    }
}
