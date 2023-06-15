using Chef.Common.Models;
using Chef.HRMS.Models;
using Chef.HRMS.Models.Report;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories.Report
{
    public class PayrollStructureReportRepository : GenericRepository <PayrollStructureReportView>, IPayrollStructureReportRepository
    {
        public PayrollStructureReportRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }
        public async Task<IEnumerable<PayrollStructureReportView>> GetEmployeePayrollProcessDetails(DateTime fromDate, DateTime ToDate, string payrollStructureIds, string paygroupIds, string designationIds, string employeeIds)
        {
            var sql = @"SELECT DISTINCT
                          jd.employeenumber AS employeecode,
                          CONCAT(e.firstname, ' ', e.middlename, ' ', e.lastname) AS employeefullname,
                          ps.name AS salarystructurename,
                          pg.name AS paygroupname,
                          jt.name AS designationname,
                          pcd.payrollprocessdate,
                          pc.id AS payrollcomponentid,
                          pc.name AS payrollcomponentname,
                          SUM(pcd.earningsamt) AS earningsamt,
                          SUM(pcd.deductionamt) AS deductionamt
                        FROM hrms.hrmsemployee e
                        LEFT JOIN hrms.jobdetails jd
                          ON e.id = jd.employeeid
                        LEFT JOIN hrms.jobtitle jt
                          ON jd.jobtitleid = jt.id
                        LEFT JOIN hrms.jobfiling jf
                          ON e.id = jf.employeeid
                        LEFT JOIN hrms.paygroup pg
                          ON jf.paygroupid = pg.id
                        INNER JOIN hrms.payrollcomponentdetails pcd
                          ON pcd.employeeid = e.id
                        INNER JOIN hrms.payrollcomponent pc
                          ON pcd.payrollcomponentid = pc.id
                        INNER JOIN hrms.payrollstructure ps
                          ON jf.payrollstructureid = ps.id
                        INNER JOIN hrms.employeesalaryconfigurationdetails escd
                          ON escd.payrollstructureid = jf.payrollstructureid
                          AND escd.payrollcomponentid = pcd.payrollcomponentid
                        WHERE pcd.payrollprocessdate BETWEEN @fromDate AND @ToDate
                        AND jf.payrollstructureid IN (" + payrollStructureIds + ")";

            if (paygroupIds != string.Empty)
            {
                sql += "AND jf.paygroupid IN (" + paygroupIds + ")";
            }
            if (designationIds != string.Empty)
            {
                sql += "AND jd.jobtitleid IN (" + designationIds + ")";
            }
            if (employeeIds != string.Empty)
            {
                sql += "AND e.id IN (" + employeeIds + ")";
            }
            sql += @"AND e.isarchived = FALSE
                     AND pcd.isarchived = FALSE
                        GROUP BY jd.employeenumber,
                            CONCAT(e.firstname, ' ', e.middlename, ' ', e.lastname),
                            ps.name,
                            pg.name,
                            jt.name,
                            pcd.payrollprocessdate,
                            pc.id,
                            pc.name";

            return await Connection.QueryAsync<PayrollStructureReportView>(sql, new { fromDate, ToDate, payrollStructureIds, paygroupIds, designationIds, employeeIds });
        }

        public async Task<IEnumerable<PayrollComponentConfiguration>> GetHeaderPayrollComponentNameByStructureId(string payrollStructureIds)
        {
            var sql = @"SELECT * FROM hrms.payrollcomponentconfiguration 
                        WHERE payrollstructureid IN ("+ payrollStructureIds +@")
                        AND isarchived = false";

            return await Connection.QueryAsync<PayrollComponentConfiguration>(sql, new { payrollStructureIds });
        }
    }
}
