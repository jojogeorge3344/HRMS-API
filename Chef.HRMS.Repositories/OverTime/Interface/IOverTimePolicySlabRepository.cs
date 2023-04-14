using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IOverTimePolicySlabRepository : IGenericRepository<OverTimeSlab>
    {
        Task<bool> IsOverTimePolicyCodeExist(string code);
        Task<IEnumerable<BenefitTypes>> GetOverTimeBenefitTypes();
    }
}
