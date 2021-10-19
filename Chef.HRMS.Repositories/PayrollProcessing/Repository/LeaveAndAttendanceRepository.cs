using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class LeaveAndAttendanceRepository : GenericRepository<LeaveAndAttendance>, ILeaveAndAttendanceRepository
    {
        public LeaveAndAttendanceRepository(DbSession session) : base(session)
        {
        }

        public async Task<IEnumerable<LeaveAndAttendanceViewModel>> GetAllLeaveAndAttendanceByPaygroup(int paygroupId, DateTime fromDate, DateTime toDate)
        {
            using (Connection)
            {
                var sql = @"SELECT Q1.*, 
                                   Q2.total    numberofworkeddays, 
                                   Q3.applied  leaveapplied, 
                                   Q4.lop, 
                                   Q5.pending  unapprovedleaves, 
                                   Q6.approved approvedleaves 
                            FROM   (SELECT e.id                                               employeeid, 
                                           Concat (e.firstname, ' ', e.lastname)              AS 
                                           employeename, 
                                           jd.employeenumber                                  employeecode, 
                                           jf.weekoff, 
                                           Count(h.date) numberOfholidays 
                                    FROM   employee e 
                                           INNER JOIN jobfiling jf 
                                                   ON e.id = jf.employeeid 
                                                      AND jf.paygroupid = @paygroupId 
                                           INNER JOIN jobdetails jd 
                                                   ON e.id = jd.employeeid 
                                           LEFT JOIN holiday h 
                                                  ON jf.holidaycategoryid = h.holidaycategoryid 
                                                     AND ( h.date BETWEEN @fromDate AND @toDate ) 
                                          WHERE e.id NOT IN(Select ppm.employeeid from payrollprocessingmethod ppm where((extract(month FROM @fromDate) = ppm.month)
                                                        AND
													    (extract(year FROM @fromDate) = ppm.year)) )
                                    GROUP  BY e.id, 
                                              jd.employeenumber, 
                                              jf.weekoff 
                                    ORDER  BY e.id)Q1 
                                   LEFT JOIN (SELECT jf.employeeid, 
                                                     Count(*) total 
                                              FROM   jobfiling jf 
                                                     LEFT JOIN regularlogin rl 
                                                            ON jf.employeeid = rl.employeeid 
                                                               AND jf.paygroupid = @paygroupId 
                                              WHERE  rl.checkintime BETWEEN @fromDate AND @toDate 
                                              GROUP  BY jf.employeeid 
                                              UNION 
                                              SELECT jf.employeeid, 
                                                     Count(*) total 
                                              FROM   jobfiling jf 
                                                     LEFT JOIN workfromhome wfh 
                                                            ON jf.employeeid = wfh.employeeid 
                                                               AND jf.paygroupid = @paygroupId 
                                              WHERE  wfh.fromdate >= @fromDate 
                                                     AND wfh.todate <= @toDate 
                                              GROUP  BY jf.employeeid 
                                              UNION 
                                              SELECT jf.employeeid, 
                                                     Count(*) total 
                                              FROM   jobfiling jf 
                                                     LEFT JOIN onduty od 
                                                            ON jf.employeeid = od.employeeid 
                                                               AND jf.paygroupid = @paygroupId 
                                              WHERE  od.fromdate >= @fromDate 
                                                     AND od.todate <= @toDate 
                                              GROUP  BY jf.employeeid)Q2 
                                          ON Q1.employeeid = Q2.employeeid 
                                   LEFT JOIN (SELECT jf.employeeid, 
                                                     Count(*)applied 
                                              FROM   jobfiling jf 
                                                     LEFT JOIN leave l 
                                                            ON jf.employeeid = l.employeeid 
                                                               AND jf.paygroupid = @paygroupId 
                                                     INNER JOIN leavecomponent lc 
                                                             ON l.leavecomponentid = lc.id 
                                              WHERE  l.fromdate >= @fromDate 
                                                     AND l.todate <= @toDate 
                                              GROUP  BY jf.employeeid)Q3 
                                          ON Q1.employeeid = Q3.employeeid 
                                   LEFT JOIN (SELECT jf.employeeid, 
                                                     Count(*)lop 
                                              FROM   jobfiling jf 
                                                     LEFT JOIN leave l 
                                                            ON jf.employeeid = l.employeeid 
                                                               AND jf.paygroupid = @paygroupId 
                                                     INNER JOIN leavecomponent lc 
                                                             ON l.leavecomponentid = lc.id 
                                              WHERE  ( l.fromdate >= @fromDate 
                                                       AND l.todate <= @toDate ) 
                                                     AND lc.code = 'LOP' 
                                              GROUP  BY jf.employeeid)Q4 
                                          ON Q1.employeeid = Q4.employeeid 
                                   LEFT JOIN (SELECT jf.employeeid, 
                                                     Count(*)pending 
                                              FROM   jobfiling jf 
                                                     LEFT JOIN leave l 
                                                            ON jf.employeeid = l.employeeid 
                                                               AND jf.paygroupid = @paygroupId 
                                                     INNER JOIN leavecomponent lc 
                                                             ON l.leavecomponentid = lc.id 
                                              WHERE  ( l.fromdate >= @fromDate 
                                                       AND l.todate <= @toDate ) 
                                                     AND l.leavestatus = 2 
                                              GROUP  BY jf.employeeid)Q5 
                                          ON Q1.employeeid = Q5.employeeid 
                                   LEFT JOIN (SELECT jf.employeeid, 
                                                     Count(*)approved 
                                              FROM   jobfiling jf 
                                                     LEFT JOIN leave l 
                                                            ON jf.employeeid = l.employeeid 
                                                               AND jf.paygroupid = @paygroupId 
                                                     INNER JOIN leavecomponent lc 
                                                             ON l.leavecomponentid = lc.id 
                                              WHERE  ( l.fromdate >= @fromDate 
                                                       AND l.todate <= @toDate ) 
                                                     AND l.leavestatus = 3 
                                              GROUP  BY jf.employeeid)Q6 
                                          ON Q1.employeeid = Q6.employeeid ";

                return await Connection.QueryAsync<LeaveAndAttendanceViewModel>(sql, new { paygroupId, fromDate, toDate });
            }
        }

        public async Task<IEnumerable<LeaveDetailsViewModel>> GetAllApprovedLeaveDetailsByEmployeeId(int employeeId, DateTime fromDate, DateTime toDate)
        {
            using (Connection)
            {
                var sql = @"SELECT DISTINCT l.id           AS id, 
                                            lc.id          AS leavecomponentid, 
                                            l.fromdate, 
                                            l.numberofdays, 
                                            l.employeeid,
                                            l.description, 
                                            l.leavestatus, 
                                            lc.description AS leavetype, 
                                            l.approvedby   AS approvedby,
                                            e.firstname    AS approver
                            FROM            leave l 
                            INNER JOIN      leavecomponent lc 
                            ON              lc.id = l.leavecomponentid 
                            INNER JOIN      employee e 
                            ON              l.approvedby = e.id 
                            WHERE           l.fromdate :: date >= @fromdate 
                            AND             l.todate ::   date <= @todate 
                            AND             l.employeeid = @employeeId 
                            AND             l.leavestatus = 3";

                return await Connection.QueryAsync<LeaveDetailsViewModel>(sql, new { employeeId, fromDate, toDate });
            }
        }

        public async Task<IEnumerable<LeaveDetailsViewModel>> GetAllUnapprovedLeaveDetailsByEmployeeId(int employeeId, DateTime fromDate, DateTime toDate)
        {
            using (Connection)
            {
                var sql = @"SELECT DISTINCT l.id           AS id, 
                                            lc.id          AS leavecomponentid, 
                                            l.employeeid,
                                            l.fromdate, 
                                            l.todate, 
                                            l.numberofdays AS numberofdays, 
                                            l.description, 
                                            l.leavestatus, 
                                            lc.description AS leavetype, 
                                            l.approveddate, 
                                            l.isfullday, 
                                            l.isfirstdayfirsthalf, 
                                            l.isfirstdaysecondhalf, 
                                            l.isseconddayfirsthalf, 
                                            l.isseconddaysecondhalf, 
                                            l.approvedby   AS approvedby, 
                                            e.firstname    AS approver 
                            FROM   LEAVE l 
                                   INNER JOIN leavecomponent lc 
                                           ON lc.id = l.leavecomponentid 
                                   INNER JOIN employee e 
                                           ON l.approvedby = e.id 
                            WHERE  l.fromdate :: date >= @fromdate 
                                   AND l.todate :: date <= @todate 
                                   AND l.employeeid = @employeeid 
                                   AND ( l.leavestatus = 1 
                                          OR l.leavestatus = 2 ) ";

                return await Connection.QueryAsync<LeaveDetailsViewModel>(sql, new { employeeId, fromDate, toDate });
            }
        }

        public async Task<IEnumerable<DateTime>> GetAllUnmarkedAttendanceDetailsByEmployeeId(int employeeId, DateTime fromDate, DateTime toDate)
        {
            using (Connection)
            {
                var sql = @"WITH calendardays AS 
                        ( 
                               SELECT actualdates::date 
                               FROM   generate_series(@fromDate, @toDate, interval '1 day' day) actualdates 
                               WHERE  extract('ISODOW' FROM actualdates) BETWEEN 1 AND    5) 
                        SELECT actualdates 
                        FROM   calendardays 
                        WHERE  actualdates NOT IN (WITH markeddays AS 
                                                   ( 
                                                                   SELECT DISTINCT get_inbetween_workingdates(fromdate::date,todate::date) AS markeddates
                                                                   FROM            onduty 
                                                                   WHERE           employeeid = @employeeId 
                                                                   UNION 
                                                                   SELECT DISTINCT get_inbetween_workingdates(fromdate::date,todate::date) AS markeddates
                                                                   FROM            workfromhome 
                                                                   WHERE           employeeid = @employeeId 
                                                                   UNION 
                                                                   SELECT DISTINCT get_inbetween_workingdates(fromdate::date,todate::date) AS markeddates
                                                                   FROM            leave 
                                                                   WHERE           employeeid = @employeeId 
                                                                   AND             leavestatus != 5 
                                                                   UNION 
                                                                   SELECT DISTINCT checkintime::date AS markeddates 
                                                                   FROM            regularlogin 
                                                                   WHERE           employeeid = @employeeId 
                                                                   UNION 
                                                                   SELECT     date::date AS markeddates 
                                                                   FROM       holiday 
                                                                   INNER JOIN jobfiling jf 
                                                                   ON         jf.holidaycategoryid = holiday.holidaycategoryid
                                                                   AND        jf.employeeid = @employeeId 
                                                                   WHERE      date BETWEEN @fromDate AND        @toDate)SELECT markeddates 
                                        FROM   markeddays 
                                        WHERE  markeddates >= @fromDate 
                                        AND    markeddates <= @toDate )";

                return await Connection.QueryAsync<DateTime>(sql, new { employeeId, fromDate, toDate });
            }
        }

        public async Task<int> GetNumberOfEmployeesByPaygroup(int paygroupId)
        {
            using (Connection)
            {
                var sql = @"SELECT Count(*) 
                            FROM   jobfiling 
                            WHERE  paygroupid = @paygroupId ";

                return await Connection.QueryFirstOrDefaultAsync<int>(sql, new { paygroupId });
            }
        }

        public async Task<int> InsertLeaveAndAttendanceDetails(IEnumerable<LeaveAndAttendance> leaveAndAttendances)
        {
            using (Connection)
            {
                if (leaveAndAttendances.Count() == 1)
                {
                    var employeeId = leaveAndAttendances.Select(x => x.EmployeeId).FirstOrDefault();
                    var getEmp = "SELECT paygroupid from jobfiling where employeeid=@employeeId";
                    int data = await Connection.QueryFirstOrDefaultAsync<int>(getEmp, new { employeeId });
                    if (data != 0)
                    {
                        (from laa in leaveAndAttendances
                         select laa).ToList().ForEach((laa) =>
                         {
                             laa.PayGroupId = data;
                             laa.CreatedDate = laa.ModifiedDate = DateTime.UtcNow;
                             laa.IsArchived = false;
                         });
                        var sql = new QueryBuilder<LeaveAndAttendance>().GenerateInsertQuery();
                        sql = sql.Replace("RETURNING id", "");
                        sql += " ON CONFLICT ON CONSTRAINT leaveandattendance_ukey_empid_pid_ppid DO ";
                        sql += new QueryBuilder<LeaveAndAttendance>().GenerateUpdateQueryOnConflict();
                        return await Connection.ExecuteAsync(sql, leaveAndAttendances);
                    }
                    else
                    {
                        return 0;
                    }

                }
                else
                {
                    (from laa in leaveAndAttendances
                     select laa).ToList().ForEach((laa) =>
                     {
                         laa.CreatedDate = laa.ModifiedDate = DateTime.UtcNow;
                         laa.IsArchived = false;
                     });
                    var sql = new QueryBuilder<LeaveAndAttendance>().GenerateInsertQuery();
                    sql = sql.Replace("RETURNING id", "");
                    sql += " ON CONFLICT ON CONSTRAINT leaveandattendance_ukey_empid_pid_ppid DO ";
                    sql += new QueryBuilder<LeaveAndAttendance>().GenerateUpdateQueryOnConflict();

                    return await Connection.ExecuteAsync(sql, leaveAndAttendances);
                }

            }
        }

        public async Task<IEnumerable<LeaveAndAttendance>> GetLeaveAndAttendanceByPayrollProcessingMethodId(int payrollProcessingMethodId)
        {
            using (Connection)
            {
                var sql = @"SELECT * FROM leaveandattendance WHERE payrollProcessingMethodId = @payrollProcessingMethodId ";

                return await Connection.QueryAsync<LeaveAndAttendance>(sql, new { payrollProcessingMethodId });
            }
        }

        public async Task<LeaveAndAttendance> GetLeaveAndAttendanceByEmployeeId(int employeeId, int payrollProcessingMethodId)
        {
            using (Connection)
            {
                var sql = @"SELECT * FROM leaveandattendance WHERE employeeId=@employeeId AND payrollProcessingMethodId = @payrollProcessingMethodId ";

                return await Connection.QueryFirstAsync<LeaveAndAttendance>(sql, new { employeeId, payrollProcessingMethodId });
            }
        }

        public async Task<IEnumerable<EmployeeAttendanceViewModel>> GetAllLeaveAndAttendanceByEmployeeId(int employeeId, DateTime fromDate, DateTime toDate)
        {
            using (Connection)
            {
                var sql = @"SELECT 'totalworkingdays'                                            AS type, 
                                   Count(*)                                                      AS totalcount 
                            FROM   generate_series(@fromDate, @toDate, interval '1' day) AS t(dt) 
                            WHERE  extract(dow FROM dt) BETWEEN 1 AND    5 
                            UNION ALL 
                            SELECT     'holidaycount' AS type, 
                                       count(*)          holidaycount 
                            FROM       holiday h 
                            INNER JOIN jobfiling jf 
                            ON         h.holidaycategoryid=jf.holidaycategoryid 
                            AND        jf.employeeid=@employeeId 
                            WHERE      date BETWEEN @fromDate AND        @toDate 
                            UNION ALL 
                            SELECT 'workeddays' AS type, 
                                   sum(attendance) 
                            FROM   ( 
                                          SELECT count(*) AS attendance 
                                          FROM   regularlogin 
                                          WHERE  employeeid = @employeeId 
                                          AND    checkintime BETWEEN @fromDate AND    @toDate 
                                          UNION ALL 
                                                    ( 
                                                         WITH onduty 
                                                              ( 
                                                                   days 
                                                              ) 
                                                              AS 
                                                              ( 
                                                                              SELECT DISTINCT get_inbetween_workingdates(fromdate::date,todate::date) AS days
                                                                              FROM            onduty 
                                                                              WHERE           employeeid = @employeeId 
                                                                              AND             isapproved=true 
                                                              )SELECT Count(*) AS attendance 
                                              FROM   onduty 
                                              WHERE  days BETWEEN @fromDate AND    @toDate) 
                                             UNION ALL 
                                                       ( 
                                                            WITH workfromhome 
                                                                 ( 
                                                                      days 
                                                                 ) 
                                                                 AS 
                                                                 ( 
                                                                                 SELECT DISTINCT get_inbetween_workingdates(fromdate::date,todate::date) AS days
                                                                                 FROM            workfromhome 
                                                                                 WHERE           employeeid = @employeeId 
                                                                                 AND             isapproved=true 
                                                                 )SELECT Count(*) AS attendance 
                                                 FROM   workfromhome 
                                                 WHERE  days BETWEEN @fromDate AND    @toDate))q1 
                            UNION ALL 
                                      ( 
                                           WITH lop 
                                                ( 
                                                     days 
                                                ) 
                                                AS 
                                                ( 
                                                                SELECT DISTINCT get_inbetween_workingdates(fromdate::date,todate::date) AS days
                                                                FROM   leave l 
                                                                       INNER JOIN leavecomponent lc 
                                                                               ON l.leavecomponentid = lc.id 
                                                                                  AND lc.code = 'LOP' 
                                                                WHERE  employeeid = @employeeid 
                                                )SELECT 'lop' AS type, 
                                       Count(*) 
                                FROM   lop 
                                WHERE  days BETWEEN @fromDate AND    @toDate) 
                               UNION ALL 
                                         ( 
                                              WITH appliedleave 
                                                   ( 
                                                        days 
                                                   ) 
                                                   AS 
                                                   ( 
                                                                   SELECT DISTINCT get_inbetween_workingdates(fromdate::date,todate::date) AS days
                                                                   FROM            leave 
                                                                   WHERE           employeeid = @employeeId 
                                                   )SELECT 'appliedleave' AS type, 
                                          Count(*) 
                                   FROM   appliedleave 
                                   WHERE  days BETWEEN @fromDate AND    @toDate) 
                                  UNION ALL 
                                            ( 
                                                 WITH approvedleave 
                                                      ( 
                                                           days, 
                                                           leavestatus 
                                                      ) 
                                                      AS 
                                                      ( 
                                                                      SELECT DISTINCT get_inbetween_workingdates(fromdate::date,todate::date) AS days,
                                                                                      leavestatus 
                                                                      FROM            leave 
                                                                      WHERE           employeeid = @employeeId 
                                                      )SELECT 'approvedleave' AS type, 
                                             Count(*) 
                                      FROM   approvedleave 
                                      WHERE  days BETWEEN @fromDate AND    @toDate 
                                      AND    leavestatus=3) 
                                     UNION ALL 
                                               ( 
                                                    WITH unapprovedleave 
                                                         ( 
                                                              days, 
                                                              leavestatus 
                                                         ) 
                                                         AS 
                                                         ( 
                                                                         SELECT DISTINCT get_inbetween_workingdates(fromdate::date,todate::date) AS days,
                                                                                         leavestatus 
                                                                         FROM            leave 
                                                                         WHERE           employeeid = @employeeId 
                                                         )SELECT 'UnApprovedleave' AS type, 
                                                Count(*) 
                                         FROM   unapprovedleave 
                                         WHERE  days BETWEEN @fromDate AND    @toDate 
                                         AND    ( 
                                                       leavestatus=1 
                                                OR     leavestatus=2))";

                return await Connection.QueryAsync<EmployeeAttendanceViewModel>(sql, new { employeeId, fromDate, toDate });
            }
        }
    }
}
