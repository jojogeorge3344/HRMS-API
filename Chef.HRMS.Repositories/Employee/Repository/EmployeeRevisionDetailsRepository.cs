using Chef.Common.Core.Extensions;
using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks; 

namespace Chef.HRMS.Repositories
{
    public class EmployeeRevisionDetailsRepository : GenericRepository<EmployeeRevisionDetails>, IEmployeeRevisionDetailsRepository
    {
        public EmployeeRevisionDetailsRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<EmployeeRevisionSalaryView>> GetEmployeeRevisionSalaryDetails(int payrollStructureId)
        {
            var sql = @"SELECT DISTINCT pcc.payrollcomponentid ,pcc.shortcode,pcc.name,pcc.maximumlimit,pc.formula
                        FROM hrms.payrollcomponentconfiguration pcc
                        INNER JOIN hrms.payrollcalculation pc
                        ON pcc.payrollstructureid = pc.payrollstructureid
                        WHERE pcc.payrollstructureid = @payrollStructureId
                        AND pcc.isarchived = false";

            return await Connection.QueryAsync<EmployeeRevisionSalaryView>(sql, new { payrollStructureId });
        }
    }
}