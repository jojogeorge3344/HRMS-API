using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class DependentRepository : GenericRepository<Dependent>, IDependentRepository
    {
        public DependentRepository(IHttpContextAccessor httpContextAccessor, DbSession session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<Dependent>> GetAllByEmployeeId(int employeeId)
        {
                var sql = "SELECT * FROM  hrms.dependent WHERE employeeId = @employeeId";

                return await Connection.QueryAsync<Dependent>(sql, new { employeeId });
        }
    }
}