using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class AttendanceAdminRepository : GenericRepository<AttendanceAdminStatsView>, IAttendanceAdminRepository
    {
        public AttendanceAdminRepository(IHttpContextAccessor httpContextAccessor, DbSession session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<AttendanceAdminStatsView>> GetTodaysAttendanceStats()
        {
                var sql = @" ( 
                             SELECT 'WFH'                 AS attendancetype, 
                                    COALESCE(Count(1), 0) AS count 
                             FROM   hrms.workfromhome 
                             WHERE  fromdate::date = CURRENT_DATE ) 
                            UNION 
                                  ( 
                                         SELECT 'Regular'             AS attendancetype, 
                                                COALESCE(Count(1), 0) AS count 
                                         FROM   hrms.regularlogin 
                                         WHERE  checkintime::date = CURRENT_DATE 
                                         AND    NOT isremotelogin ) 
                            UNION 
                                  ( 
                                         SELECT 'Remote'              AS attendancetype, 
                                                COALESCE(Count(1), 0) AS count 
                                         FROM   hrms.regularlogin 
                                         WHERE  checkintime::date = CURRENT_DATE 
                                         AND    isremotelogin ) 
                            UNION 
                                     ( 
                                            SELECT 'On Duty'             AS attendancetype, 
                                                   COALESCE(Count(1), 0) AS count 
                                            FROM   hrms.onduty 
                                            WHERE  fromdate::date = CURRENT_DATE) 
                            ORDER BY attendancetype";

                return await Connection.QueryAsync<AttendanceAdminStatsView>(sql);
        }

        public async Task<IEnumerable<AttendanceAdminLogsView>> GetAttendanceLogs(DateTime fromDate, DateTime toDate)
        {
                var sql = @"(SELECT DISTINCT e.id                                     AS employeeid, 
                                             ( Concat(e.firstname, ' ', e.lastname) ) AS employeename, 
                                             jb.department, 
                                             wfh.fromdate                             AS clockin, 
                                             wfh.todate                               AS clockout, 
                                             'WFH'                                    AS attendancetype 
                             FROM   hrms.employee e 
                                    INNER JOIN hrms.jobdetails jb 
                                            ON e.id = jb.employeeid 
                                    INNER JOIN hrms.workfromhome wfh 
                                            ON e.id = wfh.employeeid 
                             WHERE  wfh.fromdate :: date >= @fromdate 
                                    AND wfh.todate :: date <= @todate) 
                            UNION 
                            (SELECT DISTINCT e.id                                     AS employeeid, 
                                             ( Concat(e.firstname, ' ', e.lastname) ) AS employeename, 
                                             jb.department, 
                                             cio.checkintime                          AS clockin, 
                                             cio.checkouttime                         AS clockout, 
                                             'Regular'                                AS attendancetype 
                             FROM   hrms.employee e 
                                    INNER JOIN hrms.jobdetails jb 
                                            ON e.id = jb.employeeid 
                                    INNER JOIN hrms.regularlogin cio 
                                            ON e.id = cio.employeeid 
                             WHERE  NOT cio.isremotelogin 
                                    AND cio.checkintime :: date >= @fromdate 
                                    AND cio.checkouttime :: date <= @todate) 
                            UNION 
                            (SELECT DISTINCT e.id                                     AS employeeid, 
                                             ( Concat(e.firstname, ' ', e.lastname) ) AS employeename, 
                                             jb.department, 
                                             cio.checkintime                          AS clockin, 
                                             cio.checkouttime                         AS clockout, 
                                             'Remote'                                 AS attendancetype 
                             FROM   hrms.employee e 
                                    INNER JOIN hrms.jobdetails jb 
                                            ON e.id = jb.employeeid 
                                    INNER JOIN hrms.regularlogin cio 
                                            ON e.id = cio.employeeid 
                             WHERE  cio.isremotelogin 
                                    AND cio.checkintime :: date >= @fromdate 
                                    AND cio.checkouttime :: date <= @todate) 
                            UNION 
                            (SELECT DISTINCT e.id                                     AS employeeid, 
                                             ( Concat(e.firstname, ' ', e.lastname) ) AS employeename, 
                                             jb.department, 
                                             od.fromdate                              AS clockin, 
                                             od.todate                                AS clockout, 
                                             'On Duty'                                AS attendancetype 
                             FROM   hrms.employee e 
                                    INNER JOIN hrms.jobdetails jb 
                                            ON e.id = jb.employeeid 
                                    INNER JOIN hrms.onduty od 
                                            ON e.id = od.employeeid 
                             WHERE  od.fromdate :: date >= @fromdate 
                                    AND od.todate :: date <= @todate) 
                            ORDER  BY clockin DESC ";

                return await Connection.QueryAsync<AttendanceAdminLogsView>(sql, new { fromDate, toDate });
        }

        public async Task<IEnumerable<AttendanceAdminLeaveLogsView>> GetLeaveLogs(DateTime fromDate, DateTime toDate)
        {
                var sql = @"SELECT e.id                                              AS employeeid, 
                                   ( Concat(e.firstname, ' ', e.lastname) )          AS employeename, 
                                   jb.department, 
                                   l.fromdate, 
                                   l.todate, 
                                   l.description                                     AS reason, 
                                   l.createddate                                     AS applieddate, 
                                   l.leavecomponentid                                AS leavetypeid, 
                                   lc.NAME                                           AS leavetype, 
                                   (SELECT COALESCE(Count(1), 0) AS onleavetoday 
                                    FROM   hrms.leave l 
                                    WHERE  CURRENT_DATE BETWEEN fromdate AND todate) AS onleavetoday 
                            FROM   hrms.employee e 
                                   INNER JOIN hrms.jobdetails jb 
                                           ON e.id = jb.employeeid 
                                   INNER JOIN hrms.leave l 
                                           ON e.id = l.employeeid 
                                   INNER JOIN hrms.leavecomponent lc 
                                           ON l.leavecomponentid = lc.id 
                            WHERE  fromdate BETWEEN @fromDate AND @toDate ";

                return await Connection.QueryAsync<AttendanceAdminLeaveLogsView>(sql, new { fromDate, toDate });
        }

        public async Task<int> AlreadyExistOrNot(DateTime fromDate, DateTime toDate, int employeeId)
        {
            int result = 0;
                var sql = @"SELECT hrms.get_date_exist_or_not(@fromDate,@toDate,@employeeId,'hrms.leave')";
                result = await Connection.ExecuteAsync(sql, new { fromDate, toDate, employeeId });
                if (result == 0)
                {
                    sql = @"SELECT hrms.get_date_exist_or_not(@fromDate,@toDate,@employeeId,'hrms.ondyty')";
                    result = await Connection.ExecuteAsync(sql, new { fromDate, toDate, employeeId });
                    if (result == 0)
                    {
                        sql = @"SELECT hrms.get_date_exist_or_not(@fromDate,@toDate,@employeeId,'hrms.workfromhome')";
                        result = await Connection.ExecuteAsync(sql, new { fromDate, toDate, employeeId });
                        if (result == 0)
                        {
                            sql = @"SELECT hrms.get_date_exist_or_not(@fromDate,@toDate,@employeeid,'hrms.regularlogin')";
                            result = await Connection.ExecuteAsync(sql, new { fromDate, toDate, employeeId });
                            if (result != 0)
                            {
                                result = 5;

                            }
                        }
                        else
                        {
                            result = 4;
                        }
                    }
                    else
                    {
                        result = 3;
                    }
                }
                else
                {
                    result = 2;
                }
                return result;
        }

        public async Task<IEnumerable<DateTime>> MarkedDates(string tablename, int employeeId)
        {
                var sql = $@"WITH CTE (dates) AS (SELECT DISTINCT hrms.get_inbetween_workingdates(fromdate::date,todate::date) AS markeddates
                    FROM hrms.{tablename}
                    WHERE employeeid=@employeeId)
                    SELECT dates FROM CTE WHERE date_trunc('year',dates)=date_trunc('year',NOW())";
                return await Connection.QueryAsync<DateTime>(sql, new { tablename, employeeId });

        }

       
    }
}
