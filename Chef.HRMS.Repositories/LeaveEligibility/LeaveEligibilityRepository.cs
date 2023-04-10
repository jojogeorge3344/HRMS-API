using Chef.Common.Core.Extensions;
using Org.BouncyCastle.Crypto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class LeaveEligibilityRepository : TenantRepository<LeaveEligibility>, ILeaveEligibilityRepository
    {
        public LeaveEligibilityRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {

        }

        public async Task<IEnumerable<LeaveEligibility>> GetLeaveConfiguration(int id)
        {
            var sql = @"select*from hrms.leaveeligibility where leavecomponentid=@id";

            return await Connection.QueryAsync<LeaveEligibility>(sql, new { id });
        }
        public async Task<int> DeleteAsync(int id)
        {
            return await QueryFactory
            .Query<LeaveEligibility>()
            .Where("leavecomponentid", id)
            .DeleteAsync();
        }

        public async Task<IEnumerable<BenefitTypes>> GetBenefitType()
        {
            return await QueryFactory
            .Query<BenefitTypes>()
            .WhereNotArchived()
            .GetAsync<BenefitTypes>();
        }
    }
}
