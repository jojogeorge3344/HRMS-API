using Chef.Common.Core.Extensions;
using Chef.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class BankMasterRepository : TenantRepository<HRMSBank>, IBankMasterRepository
    {
        public BankMasterRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {

        }

        public async Task<bool> IsBankCodeExist(string code)
        {
            if (await QueryFactory
           .Query<HRMSBank>()
           .Where("code", code)
           .WhereNotArchived()
           .CountAsync<int>() > 0) return true;
            else return false;
        }

        public async Task<bool> IsBankNameExist(string name)
        {
            if (await QueryFactory
           .Query<HRMSBank>()
           .Where("name", name)
           .WhereNotArchived()
           .CountAsync<int>() > 0) return true;
            else return false;
        }
    }
}
