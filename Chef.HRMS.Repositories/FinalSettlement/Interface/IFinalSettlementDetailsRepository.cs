using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories.FinalSettlement
{
    public interface IFinalSettlementDetailsRepository : IGenericRepository<FinalSettlementDetails>
    {
        Task<int> DeleteByFinalSettlementId(int finalSettlementId);
        Task<IEnumerable<FinalSettlementDetails>> GetFinalSettlementDetailsByFinalSettlementId(int id);
    }
}
