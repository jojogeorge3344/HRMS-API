using Chef.HRMS.Models.BenefitCategory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class EndOfServiceRepository : TenantRepository<EndOfService>, IEndOfServiceRepository
    {
        public EndOfServiceRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {

        }
        public async Task<IEnumerable<BenefitTypes>> GetEmployeeEOSAccrualType()
        {
            var sql = @"SELECT * FROM hrms.benefittypes
                        WHERE isarchived=false AND id =30";

            return await Connection.QueryAsync<BenefitTypes>(sql);
        }
        public async Task<IEnumerable<BenefitTypes>> GetEmployeeEOSpaymentType()
        {
            var sql = @"SELECT * FROM hrms.benefittypes
                        WHERE isarchived=false AND id =13";

            return await Connection.QueryAsync<BenefitTypes>(sql);
        }
    }
}
