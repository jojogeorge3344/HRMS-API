﻿using Chef.HRMS.Models.Report;

namespace Chef.HRMS.Repositories;

public class LeaveReportRepository : GenericRepository<LeaveSummaryReportView>, ILeaveReportRepository
{
    public LeaveReportRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }

    public async Task<IEnumerable<LeaveSummaryReportView>> GetLeaveSummaryReportDetails(string reportType, DateTime fromDate, DateTime toDate, string paygroupIds, string designationIds, string locationIds, string departmentIds, string employeeCategoryIds, string leaveComponentIds, string employeeIds)
    {
        var sql = @"SELECT
                            @reportType AS reporttype,
                            @fromDate AS fromdate,
                            @toDate AS todate,
                            jd.employeenumber AS employeecode,
                            CONCAT(e.firstname, ' ', e.middlename, ' ', e.lastname) AS employeefullname,
                            las.accrualdays AS eligibledays,
                            las.availdays AS availeddays,
                            lc.name AS leavecomponentname
                        FROM
                            hrms.jobdetails jd
                            INNER JOIN hrms.hrmsemployee e ON jd.employeeid = e.id
                            INNER JOIN hrms.jobfiling jf ON jd.employeeid = jf.employeeid
                            INNER JOIN hrms.leave l ON l.employeeid = jd.employeeid
                            INNER JOIN hrms.leavedetails ld ON l.id = ld.leaveid
                            INNER JOIN hrms.leaveaccrualsummary las ON l.id = las.leaveid
                            INNER JOIN hrms.leavecomponent lc ON lc.id = l.leavecomponentid
                            LEFT JOIN hrms.paygroup pg ON pg.id = jf.paygroupid
                            LEFT JOIN hrms.jobtitle jt ON jt.id = jd.jobtitleid
                            LEFT JOIN hrms.hrmsbranch hb ON hb.id = jd.location
                            LEFT JOIN hrms.category ca ON jd.categoryid = ca.id
                        WHERE
                            ld.leavedate BETWEEN @fromDate AND @toDate";

        if (!string.IsNullOrEmpty(paygroupIds) && paygroupIds != "0")
        {
            sql += " AND pg.id IN (" + paygroupIds + ")";
        }
        if (!string.IsNullOrEmpty(designationIds) && designationIds != "0")
        {
            sql += " AND jt.id IN (" + designationIds + ")";
        }
        if (!string.IsNullOrEmpty(locationIds) && locationIds != "0")
        {
            sql += " AND hb.id IN (" + locationIds + ")";
        }
        if (!string.IsNullOrEmpty(departmentIds) && departmentIds != "0")
        {
            sql += " AND jd.department IN (" + departmentIds + ")";
        }
        if (!string.IsNullOrEmpty(employeeCategoryIds) && employeeCategoryIds != "0")
        {
            sql += " AND ca.id IN (" + employeeCategoryIds + ")";
        }
        if (!string.IsNullOrEmpty(leaveComponentIds) && leaveComponentIds != "0")
        {
            sql += " AND ld.leavecomponentid IN (" + leaveComponentIds + ")";
        }
        if (!string.IsNullOrEmpty(employeeIds) && employeeIds != "0")
        {
            sql += " AND l.employeeid IN (" + employeeIds + ")";
        }
        sql += @"
                            AND l.isarchived = FALSE
                            --AND las.isarchived = FALSE
                        GROUP BY
                            jd.employeenumber,
                            CONCAT(e.firstname, ' ', e.middlename, ' ', e.lastname),
                            las.accrualdays,
                            las.availdays,
                            lc.name";

        return await Connection.QueryAsync<LeaveSummaryReportView>(sql, new { reportType, fromDate, toDate, paygroupIds, designationIds, locationIds, departmentIds, employeeCategoryIds, leaveComponentIds, employeeIds });
    }

    public async Task<IEnumerable<LeaveDetailedReportView>> GetLeaveDetailedReportDetails(string reportType, DateTime fromDate, DateTime toDate, string paygroupIds, string designationIds, string locationIds, string departmentIds, string employeeCategoryIds, string leaveComponentIds, string employeeIds)
    {
        var sql = @"SELECT
                          @reportType AS reporttype,
                          @fromDate AS fromdate,
                          @toDate AS todate,
                          jd.employeenumber AS employeecode,
                          CONCAT(e.firstname, ' ', e.middlename, ' ', e.lastname) AS employeefullname,
                          lc.leavetype,
                          ld.leavedate
                        FROM hrms.jobdetails jd
                        INNER JOIN hrms.hrmsemployee e
                          ON jd.employeeid = e.id
                        INNER JOIN hrms.jobfiling jf
                          ON jd.employeeid = jf.employeeid
                        INNER JOIN hrms.leave l
                          ON l.employeeid = jd.employeeid
                        INNER JOIN hrms.leavedetails ld
                          ON l.id = ld.leaveid
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

        if (!string.IsNullOrEmpty(paygroupIds) && paygroupIds != "0")
        {
            sql += " AND pg.id IN (" + paygroupIds + ")";
        }
        if (!string.IsNullOrEmpty(designationIds) && designationIds != "0")
        {
            sql += " AND jt.id IN (" + designationIds + ")";
        }
        if (!string.IsNullOrEmpty(locationIds) && locationIds != "0")
        {
            sql += " AND hb.id IN (" + locationIds + ")";
        }
        if (!string.IsNullOrEmpty(departmentIds) && departmentIds != "0")
        {
            sql += " AND jd.department IN (" + departmentIds + ")";
        }
        if (!string.IsNullOrEmpty(employeeCategoryIds) && employeeCategoryIds != "0")
        {
            sql += " AND ca.id IN (" + employeeCategoryIds + ")";
        }
        if (!string.IsNullOrEmpty(leaveComponentIds) && leaveComponentIds != "0")
        {
            sql += " AND ld.leavecomponentid IN (" + leaveComponentIds + ")";
        }
        if (!string.IsNullOrEmpty(employeeIds) && employeeIds != "0")
        {
            sql += " AND l.employeeid IN (" + employeeIds + ")";
        }

        sql += @" AND l.isarchived = FALSE --and las.isarchived=false
                        GROUP BY jd.employeenumber,
                                 CONCAT(e.firstname, ' ', e.middlename, ' ', e.lastname),
                                 lc.name,
                                 ld.leavedate,
                                 lc.leavetype";

        return await Connection.QueryAsync<LeaveDetailedReportView>(sql, new { reportType, fromDate, toDate, paygroupIds, designationIds, locationIds, departmentIds, employeeCategoryIds, leaveComponentIds, employeeIds });
    }

    public async Task<IEnumerable<LeaveReportHeader>> GetLeaveSummaryReportHeaderDetails(string reportType, DateTime fromDate, DateTime toDate, string paygroupIds, string designationIds, string locationIds, string departmentIds, string employeeCategoryIds, string leaveComponentIds, string employeeIds)
    {
        var sql = @"SELECT
                          @reportType AS reporttype,
                          @fromDate AS fromdate,
                          @toDate AS todate,
                          @departmentIds AS departmentIds,
                          string_agg(DISTINCT pg.name,', ') AS paygroupcode,
                          string_agg(DISTINCT jt.name,', ') AS designationcode,
                          string_agg(DISTINCT hb.shortname,', ') AS locationcode,
                          string_agg(DISTINCT lc.name,', ') AS leavecomponentcode,
                          --string_agg(DISTINCT jd.department,', ') AS department,
                          string_agg(DISTINCT ca.name,', ') AS categorycode,
                          string_agg(DISTINCT jd.employeenumber,', ') AS employeecode
                        FROM hrms.jobdetails jd
                        INNER JOIN hrms.hrmsemployee e
                          ON jd.employeeid = e.id
                        INNER JOIN hrms.jobfiling jf
                          ON jd.employeeid = jf.employeeid
                        INNER JOIN hrms.leave l
                          ON l.employeeid = jd.employeeid
                        INNER JOIN hrms.leavedetails ld
                          ON l.id = ld.leaveid
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

        if (!string.IsNullOrEmpty(paygroupIds) && paygroupIds != "0")
        {
            sql += " AND pg.id IN (" + paygroupIds + ")";
        }
        if (!string.IsNullOrEmpty(designationIds) && designationIds != "0")
        {
            sql += " AND jt.id IN (" + designationIds + ")";
        }
        if (!string.IsNullOrEmpty(locationIds) && locationIds != "0")
        {
            sql += " AND hb.id IN (" + locationIds + ")";
        }
        if (!string.IsNullOrEmpty(departmentIds) && departmentIds != "0")
        {
            sql += " AND jd.department IN (" + departmentIds + ")";
        }
        if (!string.IsNullOrEmpty(employeeCategoryIds) && employeeCategoryIds != "0")
        {
            sql += " AND ca.id IN (" + employeeCategoryIds + ")";
        }
        if (!string.IsNullOrEmpty(leaveComponentIds) && leaveComponentIds != "0")
        {
            sql += " AND ld.leavecomponentid IN (" + leaveComponentIds + ")";
        }
        if (!string.IsNullOrEmpty(employeeIds) && employeeIds != "0")
        {
            sql += " AND l.employeeid IN (" + employeeIds + ")";
        }

        return await Connection.QueryAsync<LeaveReportHeader>(sql, new { reportType, fromDate, toDate, paygroupIds, designationIds, locationIds, departmentIds, employeeCategoryIds, leaveComponentIds, employeeIds });
    }
}
