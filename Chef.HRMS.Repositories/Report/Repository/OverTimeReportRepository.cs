using Chef.HRMS.Models.Report;
using Chef.HRMS.Repositories.Report.Interface;

namespace Chef.HRMS.Repositories.Report.Repository;

public class OverTimeReportRepository : GenericRepository<OverTimeSummaryReportView>, IOverTimeReportRepository
{
    public OverTimeReportRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }
    public async Task<IEnumerable<OverTimeSummaryReportView>> GetOverTimeSummaryReportDetails(string reportType, DateTime fromDate, DateTime toDate, string paygroupIds, string designationIds, string locationIds, string departmentIds, string employeeCategory, string overTimePolicyIds, string employeeIds)
    {
        var sql = @"SELECT
                            @reportType AS reporttype,
                            @fromDate AS fromdate,
                            @toDate AS todate,
                            jd.employeeid,
                            jd.employeenumber AS employeecode,
                            CONCAT(e.firstname, ' ', e.middlename, ' ', e.lastname) AS employeefullname,
                            o.normalovertime,
							o.holidayovertime,
							o.specialovertime,                           
                            pg.name AS paygroupname,
                            jt.name AS designationname,
                            hb.shortname AS locationname,
                            op.name AS overtimepolicyname,
                            jd.department,
                            ca.name AS categoryname
                        FROM hrms.jobdetails jd
                        INNER JOIN hrms.hrmsemployee e
                            ON jd.employeeid = e.id
                        INNER JOIN hrms.jobfiling jf
                            ON jd.employeeid = jf.employeeid

                        INNER JOIN hrms.overtime o
                            ON o.employeeid = jd.employeeid							
                        INNER JOIN hrms.overtimepolicyconfiguration pc
                            ON o.overtimepolicyid = pc.overtimepolicyid                      
                        INNER JOIN hrms.overtimepolicy op
                            ON op.id = o.overtimepolicyid

                        LEFT JOIN hrms.paygroup pg
                            ON pg.id = jf.paygroupid
                        LEFT JOIN hrms.jobtitle jt
                            ON jt.id = jd.jobtitleid
                         LEFT JOIN hrms.hrmsbranch hb
						    ON hb.id = jd.location
                        LEFT JOIN hrms.category ca
                            ON jd.categoryid = ca.id
                        WHERE o.fromdate>= @fromDate AND o.todate<= @toDate and o.requeststatus = 4 ";

        if (!string.IsNullOrEmpty(paygroupIds) && paygroupIds != string.Empty)
        {
            sql += " AND pg.id IN (" + paygroupIds + ")";
        }
        if (!string.IsNullOrEmpty(designationIds) && designationIds != string.Empty)
        {
            sql += " AND jt.id IN (" + designationIds + ")";
        }
        if (!string.IsNullOrEmpty(locationIds) && locationIds != string.Empty)
        {
            sql += " AND hb.id IN (" + locationIds + ")";
        }
        if (!string.IsNullOrEmpty(departmentIds) && departmentIds != string.Empty)
        {
            sql += " AND jd.department IN (" + departmentIds + ")";
        }
        if (!string.IsNullOrEmpty(employeeCategory) && employeeCategory != string.Empty)
        {
            sql += " AND ca.id IN (" + employeeCategory + ")";
        }
        if (!string.IsNullOrEmpty(overTimePolicyIds) && overTimePolicyIds != string.Empty)
        {
            sql += " AND o.overtimepolicyid IN (" + overTimePolicyIds + ")";
        }
        if (!string.IsNullOrEmpty(employeeIds) && employeeIds != string.Empty)
        {
            sql += " AND o.employeeid IN (" + employeeIds + ")";
        }
        sql += @" GROUP BY jd.employeenumber,
                                 CONCAT(e.firstname, ' ', e.middlename, ' ', e.lastname),                                 
                                 o.normalovertime,
							     o.holidayovertime,
							     o.specialovertime,                               
                                 pg.name,
                                 jt.name,
                                 hb.shortname,
                                 jd.employeeid,
                                 jd.department,
                                 ca.name,
                          op.name ";

        return await Connection.QueryAsync<OverTimeSummaryReportView>(sql, new { reportType, fromDate, toDate, paygroupIds, designationIds, locationIds, departmentIds, employeeCategory, overTimePolicyIds, employeeIds });
    }

    public async Task<IEnumerable<OverTimeDetailedReportView>> GetOverTimeDetailedReportDetails(string reportType, DateTime fromDate, DateTime toDate, string paygroupIds, string designationIds, string locationIds, string departmentIds, string employeeCategory, string overTimePolicyIds, string employeeIds)
    {
        var sql = @"SELECT
                          @reportType AS reporttype,
                          @fromDate AS fromdate,
                          @toDate AS todate,
                          pg.name AS paygroupname,
                          jt.name AS designationname,
                          hb.shortname AS locationname,
                          op.name AS overtimepolicyname,
                          jd.department,
                          ca.name AS categoryname,
                          jd.employeeid,
                          jd.employeenumber AS employeecode,
                          CONCAT(e.firstname, ' ', e.middlename, ' ', e.lastname) AS employeefullname,
                          o.normalovertime,
						  o.holidayovertime,
						  o.specialovertime,
                          o.fromdate::date AS OverTimeDate
                        FROM hrms.jobdetails jd
                        INNER JOIN hrms.hrmsemployee e
                          ON jd.employeeid = e.id
                        INNER JOIN hrms.jobfiling jf
                          ON jd.employeeid = jf.employeeid

                        INNER JOIN hrms.overtime o
                            ON o.employeeid = jd.employeeid							
                        INNER JOIN hrms.overtimepolicyconfiguration pc
                            ON o.overtimepolicyid = pc.overtimepolicyid                      
                        INNER JOIN hrms.overtimepolicy op
                            ON op.id = o.overtimepolicyid

                        LEFT JOIN hrms.paygroup pg
                          ON pg.id = jf.paygroupid
                        LEFT JOIN hrms.jobtitle jt
                          ON jt.id = jd.jobtitleid
                        LEFT JOIN hrms.hrmsbranch hb
						    ON hb.id = jd.location
                        LEFT JOIN hrms.category ca
                          ON jd.categoryid = ca.id
                        WHERE o.fromdate>= @fromDate AND o.todate<= @toDate and o.requeststatus = 4 ";

        if (!string.IsNullOrEmpty(paygroupIds) && paygroupIds != string.Empty)
        {
            sql += " AND pg.id IN (" + paygroupIds + ")";
        }
        if (!string.IsNullOrEmpty(designationIds) && designationIds != string.Empty)
        {
            sql += " AND jt.id IN (" + designationIds + ")";
        }
        if (!string.IsNullOrEmpty(locationIds) && locationIds != string.Empty)
        {
            sql += " AND hb.id IN (" + locationIds + ")";
        }
        if (!string.IsNullOrEmpty(departmentIds) && departmentIds != string.Empty)
        {
            sql += " AND jd.department IN (" + departmentIds + ")";
        }
        if (!string.IsNullOrEmpty(employeeCategory) && employeeCategory != string.Empty)
        {
            sql += " AND ca.id IN (" + employeeCategory + ")";
        }
        if (!string.IsNullOrEmpty(overTimePolicyIds) && overTimePolicyIds != string.Empty)
        {
            sql += " AND o.overtimepolicyid IN (" + overTimePolicyIds + ")";
        }
        if (!string.IsNullOrEmpty(employeeIds) && employeeIds != string.Empty)
        {
            sql += " AND o.employeeid IN (" + employeeIds + ")";
        }
        sql += @" AND o.isarchived = FALSE 
                        GROUP BY jd.employeenumber,
                                 CONCAT(e.firstname, ' ', e.middlename, ' ', e.lastname),
                                 o.normalovertime,
						         o.holidayovertime,
						         o.specialovertime,
                                 op.name,
                                 pg.name,
                                 jt.name,
                                 hb.shortname,
                                 jd.employeeid,
                                 jd.department,
                                 ca.name,
                                 o.fromdate";

        return await Connection.QueryAsync<OverTimeDetailedReportView>(sql, new { reportType, fromDate, toDate, paygroupIds, designationIds, locationIds, departmentIds, employeeCategory, overTimePolicyIds, employeeIds });

    }


    public async Task<IEnumerable<OverTimeReportHeader>> GetOverTimeSummaryReportHeaderDetails(string reportType, DateTime fromDate, DateTime toDate, string paygroupIds, string designationIds, string locationIds, string departmentIds, string employeeCategoryIds, string overTimePolicyIds, string employeeIds)
    {
        var sql = @"SELECT
                          @reportType AS reporttype,
                          @fromDate AS fromdate,
                          @toDate AS todate,
                            @departmentIds AS departmentIds,
                          string_agg(DISTINCT pg.name,', ') AS paygroupcode,
                          string_agg(DISTINCT jt.name,', ') AS designationcode,
                          string_agg(DISTINCT hb.shortname,', ') AS locationcode,
                          string_agg(DISTINCT op.name,', ') AS overtimepolicyname,
                          --string_agg(DISTINCT jd.department,', ') AS department,
                          string_agg(DISTINCT ca.name,', ') AS categorycode,
                          string_agg(DISTINCT jd.employeenumber,', ') AS employeecode
                        FROM hrms.jobdetails jd
                        INNER JOIN hrms.hrmsemployee e
                          ON jd.employeeid = e.id
                        INNER JOIN hrms.jobfiling jf
                          ON jd.employeeid = jf.employeeid

                      INNER JOIN hrms.overtime o
                            ON o.employeeid = jd.employeeid							
                        INNER JOIN hrms.overtimepolicyconfiguration pc
                            ON o.overtimepolicyid = pc.overtimepolicyid                      
                        INNER JOIN hrms.overtimepolicy op
                            ON op.id = o.overtimepolicyid

                        LEFT JOIN hrms.paygroup pg
                          ON pg.id = jf.paygroupid
                        LEFT JOIN hrms.jobtitle jt
                          ON jt.id = jd.jobtitleid
                        LEFT JOIN hrms.hrmsbranch hb
                          ON hb.id = jd.location
                        LEFT JOIN hrms.category ca
                          ON jd.categoryid = ca.id
                          WHERE o.fromdate>= @fromDate AND o.todate<= @toDate and o.requeststatus = 4 ";
        if (!string.IsNullOrEmpty(paygroupIds) && paygroupIds != string.Empty)
        {
            sql += " AND pg.id IN (" + paygroupIds + ")";
        }
        if (!string.IsNullOrEmpty(designationIds) && designationIds != string.Empty)
        {
            sql += " AND jt.id IN (" + designationIds + ")";
        }
        if (!string.IsNullOrEmpty(locationIds) && locationIds != string.Empty)
        {
            sql += " AND hb.id IN (" + locationIds + ")";
        }
        if (!string.IsNullOrEmpty(departmentIds) && departmentIds != string.Empty)
        {
            sql += " AND jd.department IN (" + departmentIds + ")";
        }
        if (!string.IsNullOrEmpty(employeeCategoryIds) && employeeCategoryIds != string.Empty)
        {
            sql += " AND ca.id IN (" + employeeCategoryIds + ")";
        }
        if (!string.IsNullOrEmpty(overTimePolicyIds) && overTimePolicyIds != string.Empty)
        {
            sql += " AND o.overtimepolicyid IN (" + overTimePolicyIds + ")";
        }
        if (!string.IsNullOrEmpty(employeeIds) && employeeIds != string.Empty)
        {
            sql += " AND o.employeeid IN (" + employeeIds + ")";
        }

        return await Connection.QueryAsync<OverTimeReportHeader>(sql, new { reportType, fromDate, toDate, paygroupIds, designationIds, locationIds, departmentIds, employeeCategoryIds, overTimePolicyIds, employeeIds });
    }
}

