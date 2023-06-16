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

        public async Task<IEnumerable<PayrollExcelReportView>> GetEmployeePayrollProcessDetailsForExcel(DateTime fromDate, DateTime ToDate, string designationIds, string employeeIds, string departmentIds)
        {
            int Month = fromDate.Month;

            int Year = fromDate.Year;
            var sql = @"SELECT DISTINCT 
                          @Month AS Month,
                          @Year AS Year,
                          jd.employeenumber AS employeecode,
                          CONCAT(e.firstname, ' ', e.middlename, ' ', e.lastname) AS employeefullname,
                          jd.dateofjoin,
                          jd.department,
                          jt.name AS designationname,
                          Max(laa.numberofworkeddays) AS totalworkeddays,
                          pcd.payrollcomponentid,
                          sum(pcd.earningsamt) as earningsamt,
                          sum(pcd.deductionamt) as deductionamt
                        FROM hrms.payrollcomponentdetails pcd
                        INNER JOIN hrms.hrmsemployee e
                          ON e.id = pcd.employeeid
                        LEFT JOIN hrms.jobdetails jd
                          ON jd.employeeid = pcd.employeeid
                        LEFT JOIN hrms.jobtitle jt
                          ON jt.id = jd.jobtitleid
                        INNER JOIN hrms.leaveandattendance laa
                          ON laa.employeeid = pcd.employeeid
                        WHERE pcd.payrollprocessdate BETWEEN @fromDate AND @ToDate
                        AND laa.createddate BETWEEN @fromDate AND @ToDate";
                        
            if(designationIds != string.Empty)
            {
                sql += " AND jd.jobtitleid IN("+ designationIds +")";
            }
            if (employeeIds != string.Empty)
            {
                sql += "AND pcd.employeeid IN ("+ employeeIds + ")";
            }
            if (departmentIds != string.Empty)
            {
                sql += "AND jd.department IN ("+ departmentIds + ")";
            }
                sql += @"AND pcd.isarchived = FALSE
                           GROUP BY jd.employeenumber,
                                CONCAT(e.firstname, ' ', e.middlename, ' ', e.lastname),
                                jd.dateofjoin,
                                jd.department,
                                jt.name,
                                pcd.payrollcomponentid";

            return await Connection.QueryAsync<PayrollExcelReportView>(sql, new { fromDate, ToDate, designationIds, employeeIds, departmentIds,Month,Year });
        }

        public async Task<IEnumerable<PayrollComponentExcelReportView>> GetHeaderPayrollComponentNameByDate(DateTime fromDate, DateTime ToDate)
        {
            var sql = @"SELECT DISTINCT
                          pcd.payrollcomponentid,
                          pc.shortcode as payrollcomponentcode
                        FROM hrms.payrollcomponentdetails pcd
                        INNER JOIN hrms.payrollcomponent pc
                          ON pcd.payrollcomponentid = pc.id
                        WHERE pcd.payrollprocessdate BETWEEN @fromDate AND @ToDate
                        AND pcd.isarchived = FALSE";

            return await Connection.QueryAsync<PayrollComponentExcelReportView>(sql, new { fromDate, ToDate });
        }
    }
}
