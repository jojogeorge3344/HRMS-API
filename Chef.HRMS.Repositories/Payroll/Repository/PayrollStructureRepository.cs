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

        public async Task<IEnumerable<SystemVariable>> GetAllActived(int payrollstructureid)
        {
            var sql = @"WITH my_cte AS (
                        SELECT name,shortcode AS code,'PRC' as color
                        FROM hrms.payrollcomponentconfiguration WHERE payrollstructureid = @payrollstructureid AND isarchived = false
                        UNION  
                        SELECT name,code,'SV' as color FROM hrms.systemvariable WHERE isarchived = false AND status = true
                        UNION 
                        SELECT name,code,'UV'as color FROM hrms.uservariable WHERE isarchived = false AND status = true
                        )
                        SELECT name,code,color FROM my_cte
                        GROUP BY name,code,color
                        ORDER BY name ASC";

            return await Connection.QueryAsync<SystemVariable>(sql, new { payrollstructureid });
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