using Chef.Common.Core.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories.EmployeeEncashment
{
    public class EmployeeEncashmentDetailsRepository : TenantRepository<Chef.HRMS.Models.EmployeeEncashmentDetails>, IEmployeeEncashmentDetailsRepository
    {
        public EmployeeEncashmentDetailsRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {

        }

        public async Task<int> DeleteByEncashmentId(int encashmentId)
        {
            return await QueryFactory
          .Query<EmployeeEncashmentDetails>()
          .Where("employeeencashmentid", encashmentId)
          .DeleteAsync();
        }

        public async Task<IEnumerable<EmployeeEncashmentDetails>> GetByEncashmentId(int encashmentId)
        {
            return await QueryFactory
          .Query<EmployeeEncashmentDetails>()
          .Where("employeeencashmentid", encashmentId)
          .WhereNotArchived()
          .GetAsync<EmployeeEncashmentDetails>();
        }
    }
}
