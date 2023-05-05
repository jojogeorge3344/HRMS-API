using Chef.Common.Core.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class UserVariableValuesRepository : TenantRepository<UserVariableValues>, IUserVariableValuesRepository
    {
        public UserVariableValuesRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {

        }

        public async Task<IEnumerable<UserVariable>> GetUserVariables()
        {
            return await QueryFactory
            .Query<UserVariable>()
            .Where("status",true)
            .WhereNotArchived()
            .GetAsync<UserVariable>();
        }
    }
}
