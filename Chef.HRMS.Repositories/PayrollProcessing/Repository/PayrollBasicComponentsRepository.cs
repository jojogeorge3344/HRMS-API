using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class BasicComponentRepository : GenericRepository<PayrollBasicComponent>, IPayrollBasicComponentRepository
    {
        public BasicComponentRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<EmployeeSalaryConfigurationView>> GetBasicComponentsByPaygroup(int paygoupId,int year,int month)
        {
            using (Connection)
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
                            FROM   employeesalaryconfiguration es 
                                   INNER JOIN employeesalaryconfigurationdetails esd 
                                           ON esd.employeesalaryconfigurationid = es.id 
                                   INNER JOIN payrollcalculation pcalc 
                                           ON pcalc.id = esd.payrollcalculationid 
                                   INNER JOIN payrollcomponent pc 
                                           ON pc.id = pcalc.payrollcomponentid 
                                   INNER JOIN payrollstructure ps 
                                           ON ps.id = pcalc.payrollstructureid 
                                   INNER JOIN employee e 
                                           ON e.id = es.employeeid 
                                   INNER JOIN jobfiling jf 
                                           ON jf.employeeid = e.id 
                                   INNER JOIN jobdetails jd 
                                           ON jd.employeeid = e.id 
                            WHERE  jf.paygroupid = @paygoupId 
                             AND (e.id NOT IN(Select ppm.employeeid from payrollprocessingmethod ppm where( ppm.month=@month 
                                                        AND
													     ppm.year=@year)) )";

                return await Connection.QueryAsync<EmployeeSalaryConfigurationView>(sql, new { paygoupId,year,month });
            }
        }

        public async Task<int> InsertPayrollBasicComponents(IEnumerable<PayrollBasicComponent> payrollBasicComponents)
        {
            using (Connection)
            {
                var sql = new QueryBuilder<PayrollBasicComponent>().GenerateInsertQuery();

                return await Connection.ExecuteAsync(sql, payrollBasicComponents);
            }
        }

        public async Task<IEnumerable<PayrollBasicComponent>> GetPayrollBasicComponentByPayrollProcessingMethodId(int payrollProcessingMethodId)
        {
            using (Connection)
            {
                var sql = @"SELECT * FROM payrollbasiccomponent WHERE payrollProcessingMethodId = @payrollProcessingMethodId ";

                return await Connection.QueryAsync<PayrollBasicComponent>(sql, new { payrollProcessingMethodId });
            }
        }

        public async Task<IEnumerable<PayrollBasicComponent>> GetPayrollBreakUpByEmployeeId(int employeeId, int payrollProcessingMethodId)
        {
            using (Connection)
            {
                var sql = @"SELECT * 
                            FROM   payrollbasiccomponent 
                            WHERE  employeeId = @employeeId
                                   AND payrollProcessingMethodid=@payrollProcessingMethodId";
                return await Connection.QueryAsync<PayrollBasicComponent>(sql, new { employeeId, payrollProcessingMethodId });
            }
        }

        public async Task<IEnumerable<EmployeeSalaryConfigurationView>> GetPayrollBasicComponentByEmployeeId(int employeeId)
        {
            using (Connection)
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
                            FROM   employeesalaryconfiguration es 
                                   INNER JOIN employeesalaryconfigurationdetails esd 
                                           ON esd.employeesalaryconfigurationid = es.id 
                                              AND esd.employeeid = @employeeId 
                                   INNER JOIN payrollcalculation pcalc 
                                           ON pcalc.id = esd.payrollcalculationid 
                                   INNER JOIN payrollcomponent pc 
                                           ON pc.id = pcalc.payrollcomponentid 
                                   INNER JOIN payrollstructure ps 
                                           ON ps.id = pcalc.payrollstructureid 
                                   INNER JOIN employee e 
                                           ON e.id = es.employeeid 
                                   INNER JOIN jobfiling jf 
                                           ON jf.employeeid = e.id 
                                   INNER JOIN jobdetails jd 
                                           ON jd.employeeid = e.id ";

                return await Connection.QueryAsync<EmployeeSalaryConfigurationView>(sql, new { employeeId });
            }
        }

        public async Task<int> InsertOrUpdateAsync(IEnumerable<PayrollBasicComponent> payrollBasicComponents)
        {
            using (Connection)
            {
                if (payrollBasicComponents.Select(x => x.PayGroupId).FirstOrDefault() == 0)
                {
                    var employeeId = payrollBasicComponents.Select(x => x.EmployeeId).FirstOrDefault();
                    var getEmp = "SELECT paygroupid from jobfiling where employeeid=@employeeId";
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
                        sql = sql.Replace("RETURNING id", "");
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
                    sql = sql.Replace("RETURNING id", "");
                    sql += " ON CONFLICT ON CONSTRAINT payrollbasiccomponent_ukey_empid_ppmid_payrollcomponentid DO ";
                    sql += new QueryBuilder<PayrollBasicComponent>().GenerateUpdateQueryOnConflict();
                    return await Connection.ExecuteAsync(sql, payrollBasicComponents);
                }
            }
        }
    }
}
