using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class PayrollStructureRepository : GenericRepository<PayrollStructure>, IPayrollStructureRepository
    {
        public PayrollStructureRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<PayrollStructure>> GetAllActived()
        {
            var sql = @"WITH my_cte AS (
                        SELECT name,shortcode AS code
                        FROM hrms.payrollcomponent WHERE isarchived=false
                        UNION  
                        SELECT name,code FROM hrms.systemvariable WHERE isarchived=false AND status=true
                        UNION 
                        SELECT name,code FROM hrms.uservariable WHERE isarchived=false AND status=true
                        )
                        SELECT name,code FROM my_cte
                        GROUP BY name,code";

            return await Connection.QueryAsync<PayrollStructure>(sql);
        }

        public async Task<IEnumerable<int>> GetAllAssignedPayrollStructure()
        {
                var sql = @"SELECT DISTINCT payrollstructureid 
                                    FROM hrms.jobfiling
                                    ORDER  BY payrollstructureid ASC";

                return await Connection.QueryAsync<int>(sql);
        }

        public async Task<IEnumerable<PayrollStructure>> GetAllConfiguredPayrollStructures()
        {
                var sql = @"SELECT * 
                                    FROM hrms.payrollstructure
                                    WHERE isconfigured=true";

                return await Connection.QueryAsync<PayrollStructure>(sql);
        }

        public async Task<int> UpdatePayrollStructure(int id, bool isConfigured)
        {
                var sql = @"UPDATE hrms.payrollstructure
                                   SET isconfigured=@isConfigured
                                    WHERE id=@id";

                return await Connection.ExecuteAsync(sql, new { id, isConfigured });
        }
    }
}