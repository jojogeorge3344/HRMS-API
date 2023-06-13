using Chef.Common.Core.Extensions;
using Chef.Common.Models;
using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks; 

namespace Chef.HRMS.Repositories
{
    public class EmployeeTicketRepository : GenericRepository<EmployeeTicket>, IEmployeeTicketRepository
    {
        public EmployeeTicketRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<EmployeeTicket>> GetTicketDetailsByEmployeeId(int employeeId)
        {
            return await QueryFactory
            .Query<EmployeeTicket>()
            .Where("employeeid", @employeeId)
            .WhereNotArchived()
            .GetAsync<EmployeeTicket>();
        }

        public async Task<bool> IsTravelFromExist(string fromPlace)
        {
            if (await QueryFactory
            .Query<EmployeeTicket>()
           .Where("travelfrom", fromPlace)
           .WhereNotArchived()
           .CountAsync<int>() > 0) return true;
            else return false;
        }
    }
}