using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Chef.HRMS.Models.Report;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class LeaveReportRepository : GenericRepository<LeaveSummaryReportView>, ILeaveReportRepository
    {
        public LeaveReportRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<LeaveSummaryReportView>> GetLeaveSummaryReportDetails(string reportType, DateTime fromDate, DateTime toDate, string paygroupIds, string designationIds, string locationIds, string departmentIds, string employeeCategory, string leaveComponentIds, string employeeIds)
                {
            var sql = @"SELECT
                            @reportType AS reporttype,
                            @fromDate AS fromdate,
                            @toDate AS todate,
                            jd.employeeid,
                            jd.employeenumber AS employeecode,
                            CONCAT(e.firstname, ' ', e.middlename, ' ', e.lastname) AS employeefullname,
                            las.accrualdays AS eligibledays,
                            las.availdays AS availeddays,
                            lc.name AS leavecomponentname,
                            pg.name AS paygroupname,
                            jt.name AS designationname,
                            hb.shortname AS locationname,
                            jd.department,
                            ca.name AS categoryname
                        FROM hrms.jobdetails jd
                        INNER JOIN hrms.hrmsemployee e
                            ON jd.employeeid = e.id
                        INNER JOIN hrms.jobfiling jf
                            ON jd.employeeid = jf.employeeid
                        INNER JOIN hrms.leave l
                            ON l.employeeid = jd.employeeid
                        INNER JOIN hrms.leavedetails ld
                            ON l.id = ld.leaveid
                        INNER JOIN hrms.leaveaccrualsummary las
                            ON l.id = las.leaveid
                        INNER JOIN hrms.leavecomponent lc
                            ON lc.id = l.leavecomponentid
                        LEFT JOIN hrms.paygroup pg
                            ON pg.id = jf.paygroupid
                        LEFT JOIN hrms.jobtitle jt
                            ON jt.id = jd.jobtitleid
                        LEFT JOIN hrms.hrmsbranch hb
						    ON hb.id = jd.location
                        LEFT JOIN hrms.category ca
                            ON jd.categoryid = ca.id
                        WHERE ld.leavedate BETWEEN @fromDate AND @toDate";

            if(paygroupIds != string.Empty && paygroupIds != "0")
            {
                sql += " AND pg.id IN ("+ paygroupIds + ")";
            }
            if(designationIds != string.Empty && designationIds != "0") 
            {
                sql += " AND jt.id IN ("+ designationIds + ")";
            }
            if(locationIds != string.Empty && locationIds != "0")
            {
                sql += " AND hb.id IN (" + locationIds + ")";
            }
            if(departmentIds != string.Empty && departmentIds != "0") 
            {
                sql += " AND jd.department IN ("+ departmentIds + ")";
            }
            if(employeeCategory != string.Empty && employeeCategory != "0")
            {
                sql += " AND ca.id IN ("+ employeeCategory + ")";
            }
            if(leaveComponentIds != string.Empty && leaveComponentIds != "0")
            {
                sql += " AND ld.leavecomponentid IN ("+ leaveComponentIds + ")";
            }
            if(employeeIds != string.Empty && employeeIds != "0")
            {
                sql += " AND l.employeeid IN ("+ employeeIds + ")";
            }
            sql += @" AND l.isarchived = FALSE
                        AND las.isarchived = FALSE
                        GROUP BY jd.employeenumber,
                                 CONCAT(e.firstname, ' ', e.middlename, ' ', e.lastname),
                                 las.accrualdays,
                                 las.availdays,
                                 lc.name,
                                 pg.name,
                                 jt.name,
                                 hb.shortname,
                                 jd.employeeid,
                                 jd.department,
                                 ca.name";

                return await Connection.QueryAsync<LeaveSummaryReportView>(sql, new { reportType, fromDate, toDate, paygroupIds, designationIds, locationIds, departmentIds, employeeCategory, leaveComponentIds, employeeIds });
        }

        public async Task<IEnumerable<LeaveDetailedReportView>> GetLeaveDetailedReportDetails(string reportType, DateTime fromDate, DateTime toDate, string paygroupIds, string designationIds, string locationIds, string departmentIds, string employeeCategory, string leaveComponentIds, string employeeIds)
        {
            var sql = @"SELECT
                          @reportType AS reporttype,
                          @fromDate AS fromdate,
                          @toDate AS todate,
                          pg.name AS paygroupname,
                          jt.name AS designationname,
                          hb.shortname AS locationname,
                          lc.name AS leavecomponentname,
                          jd.department,
                          ca.name AS categoryname,
                          jd.employeeid,
                          jd.employeenumber AS employeecode,
                          CONCAT(e.firstname, ' ', e.middlename, ' ', e.lastname) AS employeefullname,
                          lc.leavetype,
                          ld.leavedate,
                          l.description AS reason
                        FROM hrms.jobdetails jd
                        INNER JOIN hrms.hrmsemployee e
                          ON jd.employeeid = e.id
                        INNER JOIN hrms.jobfiling jf
                          ON jd.employeeid = jf.employeeid
                        INNER JOIN hrms.leave l
                          ON l.employeeid = jd.employeeid
                        INNER JOIN hrms.leavedetails ld
                          ON l.id = ld.leaveid
                        --INNER JOIN hrms.leaveaccrualsummary las on l.id = las.leaveid
                        INNER JOIN hrms.leavecomponent lc
                          ON lc.id = l.leavecomponentid
                        LEFT JOIN hrms.paygroup pg
                          ON pg.id = jf.paygroupid
                        LEFT JOIN hrms.jobtitle jt
                          ON jt.id = jd.jobtitleid
                        LEFT JOIN hrms.hrmsbranch hb
						    ON hb.id = jd.location
                        LEFT JOIN hrms.category ca
                          ON jd.categoryid = ca.id
                        WHERE ld.leavedate BETWEEN @fromDate AND @toDate";

            if(paygroupIds != string.Empty && paygroupIds != "0")
            {
                sql += " AND pg.id IN ("+ paygroupIds + ")";
            }
            if(designationIds != string.Empty && designationIds != "0") 
            {
                sql += " AND jt.id IN ("+ designationIds + ")";
            }
            if(locationIds != string.Empty && locationIds != "0")
            {
                sql += " AND hb.id IN (" + locationIds + ")";
            }
            if(departmentIds != string.Empty && departmentIds != "0") 
            {
                sql += " AND jd.department IN ("+ departmentIds + ")";
            }
            if(employeeCategory != string.Empty && employeeCategory != "0")
            {
                sql += " AND ca.id IN ("+ employeeCategory + ")";
            }
            if(leaveComponentIds != string.Empty && leaveComponentIds != "0")
            {
                sql += " AND ld.leavecomponentid IN ("+ leaveComponentIds + ")";
            }
            if(employeeIds != string.Empty && employeeIds != "0")
            {
                sql += " AND l.employeeid IN ("+ employeeIds + ")";
            }
            sql += @" AND l.isarchived = FALSE --and las.isarchived=false
                        GROUP BY jd.employeenumber,
                                 CONCAT(e.firstname, ' ', e.middlename, ' ', e.lastname),
                                 lc.name,
                                 pg.name,
                                 jt.name,
                                 hb.shortname,
                                 jd.employeeid,
                                 jd.department,
                                 ca.name,
                                 ld.leavedate,
                                 lc.leavetype,
                                 l.description";

            return await Connection.QueryAsync<LeaveDetailedReportView>(sql, new { reportType, fromDate, toDate, paygroupIds, designationIds, locationIds, departmentIds, employeeCategory, leaveComponentIds, employeeIds });

        }
    }
}
