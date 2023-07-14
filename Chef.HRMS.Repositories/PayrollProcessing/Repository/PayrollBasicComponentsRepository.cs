namespace Chef.HRMS.Repositories;

public class BasicComponentRepository : GenericRepository<PayrollBasicComponent>, IPayrollBasicComponentRepository
{
    public BasicComponentRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }

    public async Task<IEnumerable<EmployeeSalaryConfigurationView>> GetBasicComponentsByPaygroup(int paygoupId, int year, int month)
    {
        var sql = @"SELECT DISTINCT es.employeeid                         AS employeeid, 
                                            Concat (e.firstname, ' ', e.lastname) AS employeename, 
                                            jd.employeenumber                     AS employeecode, 
                                            es.id                                 AS 
                                            employeesalaryconfigurationid, 
                                            esd.id                                AS 
                                            employeesalaryconfigurationdetailsid, 
                                            pcalc.id                              AS payrollcalculationid, 
                                            pc.id                                 AS payrollcomponentid, 
                                            ps.id                                 AS payrollstructureid, 
                                            pc.shortcode                          AS shortcode, 
                                            pc.NAME                               AS payrollcomponentname, 
                                            ps.NAME                               AS payrollstructurename, 
                                            CASE pc.isfixed 
                                              WHEN true THEN false 
                                              ELSE true 
                                            END                                   AS iscomputed, 
                                            pcalc.formula                         AS formula, 
                                            esd.monthlyamount                     AS monthlyamount, 
                                            esd.yearlyamount                      AS yearlyamount, 
                                            es.effectivedate                      AS effectivedate, 
                                            es.version                            AS version 
                            FROM   hrms.employeesalaryconfiguration es 
                                   INNER JOIN hrms.employeesalaryconfigurationdetails esd 
                                           ON esd.employeesalaryconfigurationid = es.id 
                                   INNER JOIN hrms.payrollcalculation pcalc 
                                           ON pcalc.id = esd.payrollcalculationid 
                                   INNER JOIN hrms.payrollcomponent pc 
                                           ON pc.id = pcalc.payrollcomponentid 
                                   INNER JOIN hrms.payrollstructure ps 
                                           ON ps.id = pcalc.payrollstructureid 
                                   INNER JOIN hrms.HRMSEmployee e 
                                           ON e.id = es.employeeid 
                                   INNER JOIN hrms.jobfiling jf 
                                           ON jf.employeeid = e.id 
                                   INNER JOIN hrms.jobdetails jd 
                                           ON jd.employeeid = e.id 
                            WHERE  jf.paygroupid = @paygoupId 
                             AND (e.id NOT IN(Select ppm.employeeid from hrms.payrollprocessingmethod ppm where( ppm.month=@month 
                                                        AND
													     ppm.year=@year)) )";

        return await Connection.QueryAsync<EmployeeSalaryConfigurationView>(sql, new { paygoupId, year, month });
    }

    public async Task<int> InsertPayrollBasicComponents(IEnumerable<PayrollBasicComponent> payrollBasicComponents)
    {
        var sql = new QueryBuilder<PayrollBasicComponent>().GenerateInsertQuery();

        return await Connection.ExecuteAsync(sql, payrollBasicComponents);
    }

    public async Task<IEnumerable<PayrollBasicComponent>> GetPayrollBasicComponentByPayrollProcessingMethodId(int payrollProcessingMethodId)
    {
        var sql = @"SELECT * FROM hrms.payrollbasiccomponent WHERE payrollProcessingMethodId = @payrollProcessingMethodId ";

        return await Connection.QueryAsync<PayrollBasicComponent>(sql, new { payrollProcessingMethodId });
    }

    public async Task<IEnumerable<PayrollBasicComponent>> GetPayrollBreakUpByEmployeeId(int employeeId, int payrollProcessingMethodId)
    {
        var sql = @"SELECT * 
                            FROM   hrms.payrollbasiccomponent 
                            WHERE  employeeId = @employeeId
                                   AND payrollProcessingMethodid=@payrollProcessingMethodId";
        return await Connection.QueryAsync<PayrollBasicComponent>(sql, new { employeeId, payrollProcessingMethodId });
    }

    public async Task<IEnumerable<EmployeeSalaryConfigurationView>> GetPayrollBasicComponentByEmployeeId(int employeeId)
    {
        var sql = @"SELECT DISTINCT es.employeeid                         AS employeeid, 
                                            Concat (e.firstname, ' ', e.lastname) AS employeename, 
                                            jd.employeenumber                     AS employeecode, 
                                            es.id                                 AS 
                                            employeesalaryconfigurationid, 
                                            esd.id                                AS 
                                            employeesalaryconfigurationdetailsid, 
                                            pcalc.id                              AS payrollcalculationid, 
                                            pc.id                                 AS payrollcomponentid, 
                                            ps.id                                 AS payrollstructureid, 
                                            pc.shortcode                          AS shortcode, 
                                            pc.NAME                               AS payrollcomponentname, 
                                            ps.NAME                               AS payrollstructurename, 
                                            CASE pc.isfixed 
                                              WHEN true THEN false 
                                              ELSE true 
                                            END                                   AS iscomputed, 
                                            pcalc.formula                         AS formula, 
                                            esd.monthlyamount                     AS monthlyamount, 
                                            esd.yearlyamount                      AS yearlyamount, 
                                            es.effectivedate                      AS effectivedate, 
                                            es.version                            AS version 
                            FROM   hrms.employeesalaryconfiguration es 
                                   INNER JOIN hrms.employeesalaryconfigurationdetails esd 
                                           ON esd.employeesalaryconfigurationid = es.id 
                                              AND esd.employeeid = @employeeId 
                                   INNER JOIN hrms.payrollcalculation pcalc 
                                           ON pcalc.id = esd.payrollcalculationid 
                                   INNER JOIN hrms.payrollcomponent pc 
                                           ON pc.id = pcalc.payrollcomponentid 
                                   INNER JOIN hrms.payrollstructure ps 
                                           ON ps.id = pcalc.payrollstructureid 
                                   INNER JOIN hrms.HRMSEmployee e 
                                           ON e.id = es.employeeid 
                                   INNER JOIN hrms.jobfiling jf 
                                           ON jf.employeeid = e.id 
                                   INNER JOIN hrms.jobdetails jd 
                                           ON jd.employeeid = e.id ";

        return await Connection.QueryAsync<EmployeeSalaryConfigurationView>(sql, new { employeeId });
    }

    public async Task<int> InsertOrUpdateAsync(IEnumerable<PayrollBasicComponent> payrollBasicComponents)
    {
        int result = 0;

        using (var transaction = Connection.BeginTransaction())
        {
            try
            {
                if (payrollBasicComponents.Select(x => x.PayGroupId).FirstOrDefault() == 0)
                {
                    var employeeId = payrollBasicComponents.Select(x => x.EmployeeId).FirstOrDefault();
                    var getEmp = "SELECT paygroupid from hrms.jobfiling where employeeid=@employeeId";
                    int data = await Connection.QueryFirstOrDefaultAsync<int>(getEmp, new { employeeId });
                    if (data != 0)
                    {
                        (from pbc in payrollBasicComponents
                         select pbc).ToList().ForEach((pbc) =>
                         {
                             pbc.PayGroupId = data;
                             pbc.CreatedDate = pbc.ModifiedDate = DateTime.UtcNow;
                             pbc.IsArchived = false;
                         });
                        var sql = new QueryBuilder<PayrollBasicComponent>().GenerateInsertQuery();
                        sql = sql.Replace("RETURNING Id", " ");
                        sql += " ON CONFLICT ON CONSTRAINT payrollbasiccomponent_ukey_empid_ppmid_payrollcomponentid DO ";
                        sql += new QueryBuilder<PayrollBasicComponent>().GenerateUpdateQueryOnConflict();
                        return await Connection.ExecuteAsync(sql, payrollBasicComponents);
                    }
                    else
                    {
                        return 0;
                    }
                }
                else
                {
                    (from pbc in payrollBasicComponents
                     select pbc).ToList().ForEach((pbc) =>
                     {
                         pbc.CreatedDate = pbc.ModifiedDate = DateTime.UtcNow;
                         pbc.IsArchived = false;
                     });
                    var sql = new QueryBuilder<PayrollBasicComponent>().GenerateInsertQuery();
                    sql = sql.Replace("RETURNING Id", " ");
                    sql += " ON CONFLICT ON CONSTRAINT payrollbasiccomponent_ukey_empid_ppmid_payrollcomponentid DO ";
                    sql += new QueryBuilder<PayrollBasicComponent>().GenerateUpdateQueryOnConflict();
                    await Connection.ExecuteAsync(sql, payrollBasicComponents);
                }
                transaction.Commit();
            }
            catch (Exception ex)
            {
                string msg = ex.Message;
                transaction.Rollback();
            }
        }
        return result;
    }
}

