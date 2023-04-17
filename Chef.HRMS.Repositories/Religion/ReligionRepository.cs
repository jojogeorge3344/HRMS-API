using Chef.Common.Core.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class ReligionRepository : TenantRepository<Religion>, IReligionRepository
    {
        public ReligionRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {

        }

        public async  Task<bool> IsReligionCodeExist(string code)
        {
            if (await QueryFactory
            .Query<Religion>()
           .Where("code", code)
           .WhereNotArchived()
           .CountAsync<int>() > 0) return true;
            else return false;
        }
        public async Task<bool> IsReligionNameExist(string name)
        {
            if (await QueryFactory
            .Query<Religion>()
           .Where("name", name)
           .WhereNotArchived()
           .CountAsync<int>() > 0) return true;
            else return false;
        }
    }
}
