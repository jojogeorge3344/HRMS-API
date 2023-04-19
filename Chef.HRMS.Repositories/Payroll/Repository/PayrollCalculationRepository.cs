namespace Chef.HRMS.Repositories
{
    public class PayrollCalculationRepository : GenericRepository<PayrollCalculation>, IPayrollCalculationRepository
    {
        public PayrollCalculationRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<PayrollCalculationViewModel>> GetAllCalculationDetails()
        {
                var sql = @"SELECT DISTINCT ps.id          AS payrollstructureid, 
                                            ps.NAME        AS PayrollStructureName, 
                                            pcmp.id        AS PayrollComponentId, 
                                            pcmp.NAME      AS payrollComponentName, 
                                            pcmp.shortcode AS ShortCode, 
                                            pcalc.id As Id,
                                            pcmp.payheadbaseunittype,
                                            pcmp.payheadcontractvaluetype,
                                            CASE pcmp.isfixed 
                                              WHEN true THEN false 
                                              ELSE true 
                                            END            AS isfixed, 
                                            pcalc.iscomputed,
                                            pcalc.formula 
                            FROM   hrms.payrollstructure ps 
                                   INNER JOIN hrms.payrollcomponentconfiguration pc 
                                           ON ps.id = pc.payrollstructureid 
                                   INNER JOIN hrms.payrollcomponent pcmp 
                                           ON pc.payrollcomponentid = pcmp.id 
                                   LEFT JOIN hrms.payrollcalculation pcalc 
                                          ON pcmp.id = pcalc.payrollcomponentid 
                                          AND ps.id=pcalc.payrollstructureid  
                            GROUP  BY ps.id, 
                                      pcmp.id, 
                                      pcalc.formula,
                                      pcalc.id
                            ORDER  BY ps.id DESC";

                return await Connection.QueryAsync<PayrollCalculationViewModel>(sql);
        }

        public async Task<IEnumerable<PayrollCalculationViewModel>> GetPayrollComponentsByEmployeeId(int employeeId)
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
                            FROM   hrms.payrollstructure ps 
                                   INNER JOIN hrms.jobfiling jf 
                                           ON ps.id = jf.payrollstructureid 
                                              AND jf.employeeid = @employeeid 
                                   INNER JOIN hrms.payrollcomponentconfiguration pc 
                                           ON ps.id = pc.payrollstructureid 
                                   INNER JOIN hrms.payrollcomponent pcmp 
                                           ON pc.payrollcomponentid = pcmp.id 
                                   LEFT JOIN hrms.payrollcalculation pcalc 
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

        public async Task<IEnumerable<PayrollCalculation>> GetAllCalculationDetailsById(int id)
        {
                var sql = "SELECT * From hrms.payrollcalculation WHERE payrollstructureid=@id";

                return await Connection.QueryAsync<PayrollCalculation>(sql, new { id });
        }

        public async Task<bool> IsSystemVariableExist(string code)
        {
            var sql = @"SELECT * FROM hrms.payrollcalculation WHERE formula LIKE '%"+code+"%' AND isarchived = false";

            if ((await Connection.QueryFirstOrDefaultAsync<int>(sql, new {})) >= 1)
            {
                return true;
            }

            return false;
        }
    }
}