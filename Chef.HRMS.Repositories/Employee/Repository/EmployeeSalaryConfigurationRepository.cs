using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class EmployeeSalaryConfigurationRepository : GenericRepository<EmployeeSalaryConfiguration>, IEmployeeSalaryConfigurationRepository
    {
        public EmployeeSalaryConfigurationRepository(IHttpContextAccessor httpContextAccessor, DbSession session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<EmployeeSalaryConfigurationView>> GetSalaryConfigurationByEmployeeId(int employeeId)
        {

                var sql = @"SELECT DISTINCT es.employeeid     AS employeeid, 
                                            es.id             AS employeesalaryconfigurationid, 
                                            esd.id            AS employeesalaryconfigurationdetailsid, 
                                            pcalc.id          AS payrollcalculationid, 
                                            pc.payrollcomponentid            AS payrollcomponentid, 
                                            ps.id             AS payrollstructureid, 
                                            pc.shortcode      AS shortcode, 
                                            pc.NAME           AS payrollcomponentname, 
                                            ps.NAME           AS payrollstructurename, 
                                            CASE pc.payrollcomponenttype 
                                              WHEN 1 THEN false 
                                              ELSE true 
                                            END               AS iscomputed, 
                                            pcalc.formula     AS formula, 
                                            esd.monthlyamount AS monthlyamount, 
                                            esd.yearlyamount  AS yearlyamount, 
                                            es.effectivedate  AS effectivedate, 
                                            es.version        AS version, 
                                            es.createddate    AS createddate, 
                                            es.modifieddate   AS modifieddate, 
                                            es.createdby      AS createdby, 
                                            es.modifiedby     AS modifiedby, 
                                            esd.createddate   AS detailcreateddate, 
                                            esd.modifieddate  AS detailmodifieddate, 
                                            esd.createdby     AS detailcreatedby, 
                                            esd.modifiedby    AS detailmodifiedby 
                            FROM   hrms.employeesalaryconfiguration es 
                                   INNER JOIN hrms.employeesalaryconfigurationdetails esd 
                                           ON esd.employeesalaryconfigurationid = es.id 
                                   INNER JOIN hrms.payrollcalculation pcalc 
                                           ON pcalc.id = esd.payrollcalculationid 
                                   INNER JOIN hrms.payrollstructure ps 
                                           ON ps.id = pcalc.payrollstructureid 
                                   INNER JOIN hrms.payrollcomponentconfiguration pc 
                                           ON pc.payrollcomponentid = pcalc.payrollcomponentid 
                            WHERE  es.employeeid = @employeeid
                            ORDER BY iscomputed";

                return await Connection.QueryAsync<EmployeeSalaryConfigurationView>(sql, new { employeeId });

        }

        public async Task<int> DeleteByEmployeeId(int employeeId)
        {

                var sql = @"Delete FROM hrms.employeesalaryconfiguration WHERE employeeid = @employeeid";

                return await Connection.ExecuteAsync(sql, employeeId);
        }
    }
}
