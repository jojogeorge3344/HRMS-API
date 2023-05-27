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

        public async Task<IEnumerable<BenefitTypes>> GetOverTimeBenefitTypes()
        {
            //var sql = @"SELECT * FROM hrms.benefittypes WHERE id IN (8,9,10)";

            int bt1 = (int)Chef.HRMS.Types.BenefitType.NormalOvertime;
            int bt2 = (int)Chef.HRMS.Types.BenefitType.HolidayOvertime;
            int bt3 = (int)Chef.HRMS.Types.BenefitType.SpecialOvertime;
            var sql = @"SELECT * FROM hrms.benefittypes WHERE id IN( " + bt1 + " , " + bt2 + " , " + bt3 + " )";
            return await Connection.QueryAsync<BenefitTypes>(sql);
        }

        public async Task<IEnumerable<OverTimeSlab>> GetOverTimeComponentDetails(int overtimepolicyid)
        {
            return await QueryFactory
               .Query<OverTimeSlab>()
               .Where("overtimepolicyid", overtimepolicyid)
               .WhereNotArchived()
               .OrderBy("id")
               .GetAsync<OverTimeSlab>();
        }

        public async Task<bool> IsOverTimePolicyCodeExist(string code)
        {
            if (await QueryFactory
           .Query<OverTimeSlab>()
           .Where("overtimepolicycode", code)
           .WhereNotArchived()
           .CountAsync<int>() > 0) return true;
            else return false;
        }

    }
}
