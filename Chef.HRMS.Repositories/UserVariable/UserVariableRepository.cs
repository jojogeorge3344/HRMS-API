using Chef.Common.Core.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class UserVariableRepository : TenantRepository<UserVariable>, IUserVariableRepository
    {
        public UserVariableRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {

        }
        public async Task<bool> IsUserVariableExist(string code)
        {
            if (await QueryFactory
          .Query<UserVariable>()
          .Where("code", code)
          .WhereNotArchived()
          .CountAsync<int>() > 0) return true;
            else return false;
        }
    }
}
