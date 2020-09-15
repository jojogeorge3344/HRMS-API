using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class PayrollCalculationRepository : GenericRepository<PayrollCalculation>, IPayrollCalculationRepository
    {
        public PayrollCalculationRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<PayrollCalculationViewModel>> GetAllCalculationDetails()
        {
            using (Connection)
            {
                var sql = @"SELECT DISTINCT ps.id          AS payrollstructureid, 
                                            ps.NAME        AS PayrollStructureName, 
                                            pcmp.id        AS PayrollComponentId, 
                                            pcmp.NAME      AS payrollComponentName, 
                                            pcmp.shortcode AS ShortCode, 
                                            pcalc.id As Id,
                                            CASE pcmp.isfixed 
                                              WHEN true THEN false 
                                              ELSE true 
                                            END            AS isfixed, 
                                            pcalc.iscomputed,
                                            pcalc.formula 
                            FROM   payrollstructure ps 
                                   INNER JOIN payrollcomponentconfiguration pc 
                                           ON ps.id = pc.payrollstructureid 
                                   INNER JOIN payrollcomponent pcmp 
                                           ON pc.payrollcomponentid = pcmp.id 
                                   LEFT JOIN payrollcalculation pcalc 
                                          ON pcmp.id = pcalc.payrollcomponentid 
                                          AND ps.id=pcalc.payrollstructureid  
                            GROUP  BY ps.id, 
                                      pcmp.id, 
                                      pcalc.formula,
                                      pcalc.id
                            ORDER  BY isfixed ASC";

                return await Connection.QueryAsync<PayrollCalculationViewModel>(sql);
            }
        }

        public async Task<IEnumerable<PayrollCalculationViewModel>> GetPayrollComponentsByEmployeeId(int employeeId)
        {
            using (Connection)
            {
                var sql = @"SELECT DISTINCT ps.id          AS payrollstructureid, 
                                            ps.NAME        AS PayrollStructureName, 
                                            pcmp.id        AS PayrollComponentId, 
                                            pcmp.NAME      AS payrollComponentName, 
                                            pcmp.shortcode AS ShortCode, 
                                            pcalc.id       AS Id, 
                                            CASE pcmp.isfixed 
                                              WHEN true THEN false 
                                              ELSE true 
                                            END            AS isfixed, 
                                            pcalc.iscomputed, 
                                            pcalc.formula, 
                                            pc.maximumlimit 
                            FROM   payrollstructure ps 
                                   INNER JOIN jobfiling jf 
                                           ON ps.id = jf.payrollstructureid 
                                              AND jf.employeeid = @employeeid 
                                   INNER JOIN payrollcomponentconfiguration pc 
                                           ON ps.id = pc.payrollstructureid 
                                   INNER JOIN payrollcomponent pcmp 
                                           ON pc.payrollcomponentid = pcmp.id 
                                   LEFT JOIN payrollcalculation pcalc 
                                          ON pcmp.id = pcalc.payrollcomponentid 
                                          AND ps.id=pcalc.payrollstructureid  
                            GROUP  BY ps.id, 
                                      pcmp.id, 
                                      pc.maximumlimit, 
                                      pcalc.formula, 
                                      pcalc.id
                            ORDER BY isfixed";

                return await Connection.QueryAsync<PayrollCalculationViewModel>(sql, new { employeeId });
            }
        }

        public async Task<IEnumerable<PayrollCalculation>> GetAllCalculationDetailsById(int id)
        {
            using (Connection)
            {
                var sql = "SELECT * from payrollcalculation where payrollstructureid=@id";

                return await Connection.QueryAsync<PayrollCalculation>(sql, new { id });
            }
        }

    }
}