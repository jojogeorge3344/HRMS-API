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
    public class EmployeeRevisionDetailsOldRepository : GenericRepository<EmployeeRevisionDetailsOld>, IEmployeeRevisionDetailsOldRepository
    {
        public EmployeeRevisionDetailsOldRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<int> InsertAsync(IEnumerable<EmployeeRevisionDetailsOld> employeeRevisionDetailsOld)
        {
            var sql = new QueryBuilder<EmployeeRevisionDetailsOld>().GenerateInsertQuery();

            return await Connection.ExecuteAsync(sql, employeeRevisionDetailsOld);
        }

        public async Task<IEnumerable<EmployeeRevisionDetailsOld>> GetOldEmployeeRevisionSalaryDetail(int employeeRevisionId)
        {
            var sql = @"SELECT erdo.*,pc.name FROM hrms.employeerevisiondetailsold erdo
                        INNER JOIN hrms.payrollcomponent pc
                        ON erdo.payrollcomponentid = pc.id
                        WHERE employeerevisionid = @employeeRevisionId
                        AND erdo.isarchived = false ORDER BY erdo.payrollcomponentid ASC";

            return await Connection.QueryAsync<EmployeeRevisionDetailsOld>(sql, new { employeeRevisionId });
        }

        public async Task<int> UpdateAsync(IEnumerable<EmployeeRevisionDetailsOld> employeeRevisionDetailsOld)
        {
            var sql = new QueryBuilder<EmployeeRevisionDetailsOld>().GenerateUpdateQuery();
            return await Connection.ExecuteAsync(sql, employeeRevisionDetailsOld);
        }
    }
}