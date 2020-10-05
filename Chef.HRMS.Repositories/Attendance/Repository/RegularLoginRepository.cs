﻿using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class RegularLoginRepository : GenericRepository<RegularLogin>, IRegularLoginRepository
    {
        public RegularLoginRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<RegularLogin>> GetAllAttendanceById(int employeeId)
        {
            using (Connection)
            {
                var sql = "SELECT * FROM  regularlogin WHERE employeeid = @employeeId";

                return await Connection.QueryAsync<RegularLogin>(sql, new { employeeId });
            }
        }
        public async Task<IEnumerable<UserAttendanceViewModel>> GetAttendanceLog(int employeeId, DateTime startDate, DateTime endDate)
        {
            using (Connection)
            {
                var sql = string.Format(@"WITH shiftdetails 
                                         ( 
                                              effectivehours, 
                                              shiftstarttime, 
                                              shiftendtime 
                                         ) 
                                         AS 
                                         ( 
                                                    SELECT     Concat(To_char(endtime - starttime, 'HH:MI'), ' hrs'), 
                                                               s.starttime, 
                                                               s.endtime 
                                                    FROM       shift s 
                                                    INNER JOIN jobfiling jf 
                                                    ON         s.id = jf.shiftid 
                                                    AND        jf.employeeid = @employeeId 
                                         ) 
                                         , 
                                         wfhdata 
                                         ( 
                                              wfhdates, 
                                              isapproved 
                                         ) 
                                         AS 
                                         ( 
                                                SELECT Get_inbetween_workingdates(fromdate :: date, todate :: date), 
                                                       isapproved 
                                                FROM   workfromhome 
                                                WHERE  employeeid = @employeeId 
                                         ) 
                                         , 
                                         ondutydata 
                                         ( 
                                              ondutydates, 
                                              isapproved 
                                         ) 
                                         AS 
                                         ( 
                                                SELECT Get_inbetween_workingdates(fromdate :: date, todate :: date), 
                                                       isapproved 
                                                FROM   onduty 
                                                WHERE  employeeid = @employeeId 
                                         ) 
                                         , 
                                         leavedata 
                                         ( 
                                              leavedates 
                                         ) 
                                         AS 
                                         ( 
                                                SELECT Get_inbetween_workingdates(fromdate :: date, todate :: date) 
                                                FROM   leave 
                                                WHERE  employeeid = @employeeId 
                                         ) 
                                    SELECT wfhdates::date AS date, 
                                           shiftstarttime AS clockin, 
                                           shiftendtime   AS clockout, 
                                           effectivehours, 
                                           effectivehours AS grosshours, 
                                           'WFH'          AS attendancetype, 
                                           isapproved     AS isapproved 
                                    FROM   shiftdetails, 
                                           wfhdata 
                                    WHERE  wfhdates BETWEEN symmetric '{0}' AND    '{1}' 
                                    UNION 
                                    SELECT ondutydates::date AS date, 
                                           shiftstarttime    AS clockin, 
                                           shiftendtime      AS clockout, 
                                           effectivehours, 
                                           effectivehours AS grosshours, 
                                           'On Duty'      AS attendancetype, 
                                           isapproved     AS isapproved 
                                    FROM   shiftdetails, 
                                           ondutydata 
                                    WHERE  ondutydates BETWEEN symmetric '{0}' AND    '{1}' 
                                    UNION 
                                    SELECT leavedates::date AS date, 
                                           shiftstarttime   AS clockin, 
                                           shiftendtime     AS clockout, 
                                           effectivehours, 
                                           effectivehours AS grosshours, 
                                           'Leave'        AS attendancetype, 
                                           true           AS isapproved 
                                    FROM   shiftdetails, 
                                           leavedata 
                                    WHERE  leavedates BETWEEN symmetric '{0}' AND    '{1}' 
                                    UNION 
                                    SELECT   checkintime::date AS date, 
                                             checkintime       AS clockin, 
                                             checkouttime      AS clockout, 
                                             effectivehours, 
                                                      concat(to_char(format('%s:%s', round(extract('epoch' FROM checkouttime - checkintime) / 3600), to_char(checkouttime - checkintime, 'MI')) :: interval, 'HH24:MI'), ' hrs') AS grosshours,
                                             'Regular'                                                                                                                                                                           AS attendancetype,
                                             true                                                                                                                                                                                AS isapproved
                                    FROM     shiftdetails, 
                                             regularlogin 
                                    WHERE    employeeid = @employeeId 
                                    AND      checkintime BETWEEN symmetric '{0}' AND      '{1}' 
                                    ORDER BY clockin DESC ", startDate.ToString("yyyy/MM/dd"), endDate.ToString("yyyy/MM/dd"));

                return await Connection.QueryAsync<UserAttendanceViewModel>(sql, new { employeeId });
            }
        }

        public async Task<decimal> GetAverageAttendanceById(int employeeId, int requestType)
        {
            using (Connection)
            {
                var sql = "";

                // If it is weekly
                if (requestType == 1)
                {
                    sql = @"WITH shift 
                             ( 
                                  hours 
                             ) 
                             AS 
                             ( 
                                        SELECT     EXTRACT(epoch FROM s.endtime-s.starttime)/3600 AS duration 
                                        FROM       shift s 
                                        INNER JOIN jobfiling jf 
                                        ON         s.id=jf.shiftid 
                                        AND        jf.employeeid=@Id 
                             ) 
                             , 
                             cte1 
                             ( 
                                  actualdays 
                             ) 
                             AS 
                             ( 
                                  WITH cte2 
                                       ( 
                                            dates 
                                       ) 
                                       AS 
                                       ( 
                                              SELECT Get_inbetween_workingdates(fromdate::date,todate::date) 
                                              FROM   onduty 
                                              WHERE  employeeid=@Id 
                                              UNION ALL 
                                              SELECT Get_inbetween_workingdates(fromdate::date,todate::date) 
                                              FROM   workfromhome 
                                              WHERE  employeeid=@Id 
                                              UNION ALL 
                                              SELECT distinct checkintime 
                                              FROM   regularlogin 
                                              WHERE  employeeid = @Id 
                                       ) 
                                SELECT Count(dates) 
                                FROM   cte2 
                                WHERE  dates >CURRENT_DATE - interval '7 days' 
                             ) 
                        SELECT round(cast(cast(actualdays*hours/actualdays AS float) AS numeric),2) 
                        FROM   cte1, 
                               shift";
                }
                // If it is monthly
                else if (requestType == 2)
                {
                    sql = @"WITH shift 
                             ( 
                                  hours 
                             ) 
                             AS 
                             ( 
                                        SELECT     EXTRACT(epoch FROM s.endtime-s.starttime)/3600 AS duration 
                                        FROM       shift s 
                                        INNER JOIN jobfiling jf 
                                        ON         s.id=jf.shiftid 
                                        AND        jf.employeeid=@Id 
                             ) 
                             , 
                             cte1 
                             ( 
                                  actualdays 
                             ) 
                             AS 
                             ( 
                                  WITH cte2 
                                       ( 
                                            dates 
                                       ) 
                                       AS 
                                       ( 
                                              SELECT Get_inbetween_workingdates(fromdate::date,todate::date) 
                                              FROM   onduty 
                                              WHERE  employeeid=@Id 
                                              UNION ALL 
                                              SELECT Get_inbetween_workingdates(fromdate::date,todate::date) 
                                              FROM   workfromhome 
                                              WHERE  employeeid=@Id 
                                              UNION ALL 
                                              SELECT distinct checkintime 
                                              FROM   regularlogin 
                                              WHERE  employeeid = @Id 
                                       ) 
                                SELECT Count(dates) 
                                FROM   cte2 
                                WHERE  dates >CURRENT_DATE - interval '30 days' 
                             ) 
                        SELECT round(cast(cast(actualdays*hours/actualdays AS float) AS numeric),2) 
                        FROM   cte1, 
                               shift";
                }

                return await Connection.QueryFirstOrDefaultAsync<decimal>(sql, new { Id = employeeId });
            }
        }

        public async Task<decimal> GetAverageOnTimeDetails(int employeeId, int requestType)
        {
            using (Connection)
            {
                var sql = "";

                // If it is weekly
                if (requestType == 1)
                {
                    sql = @"WITH cte1 
                             ( 
                                  actualcount 
                             ) 
                             AS 
                             ( 
                                  WITH cte2 
                                       ( 
                                            dates 
                                       ) 
                                       AS 
                                       ( 
                                              SELECT Get_inbetween_workingdates(fromdate::date,todate::date) 
                                              FROM   leave 
                                              WHERE  employeeid=@Id 
                                              UNION ALL 
                                              SELECT Get_inbetween_workingdates(fromdate::date,todate::date) 
                                              FROM   onduty 
                                              WHERE  employeeid=@Id 
                                              UNION ALL 
                                              SELECT Get_inbetween_workingdates(fromdate::date,todate::date) 
                                              FROM   workfromhome 
                                              WHERE  employeeid=@Id 
                                              UNION ALL 
                                              SELECT     checkintime 
                                              FROM       regularlogin r 
                                              INNER JOIN jobfiling jf 
                                              ON         r.employeeid=jf.employeeid 
                                              INNER JOIN shift s 
                                              ON         jf.shiftid=s.id 
                                              WHERE      r.employeeid = @Id 
                                              AND        r.checkintime::time<=s.starttime::time 
                                       ) 
                            SELECT Count(dates) 
                            FROM   cte2 
                            WHERE  dates >CURRENT_DATE - interval '7 days' 
                             ) 
                             , 
                             cte3 
                             ( 
                                  totalcount 
                             ) 
                             AS 
                             ( 
                                  WITH cte4 
                                       ( 
                                            dates 
                                       ) 
                                       AS 
                                       ( 
                                              SELECT get_inbetween_workingdates(fromdate::date,todate::date) 
                                              FROM   leave 
                                              WHERE  employeeid=@Id 
                                              UNION ALL 
                                              SELECT get_inbetween_workingdates(fromdate::date,todate::date) 
                                              FROM   onduty 
                                              WHERE  employeeid=@Id 
                                              UNION ALL 
                                              SELECT get_inbetween_workingdates(fromdate::date,todate::date) 
                                              FROM   workfromhome 
                                              WHERE  employeeid=@Id 
                                              UNION ALL 
                                              SELECT checkintime 
                                              FROM   regularlogin 
                                              WHERE  employeeid = @Id 
                                       ) 
                                SELECT count(dates) 
                                FROM   cte4 
                                WHERE  dates >CURRENT_DATE - interval '7 days' 
                             ) 
                        SELECT ROUND(CAST((cast(actualcount AS float)/cast(totalcount AS float))*100 AS NUMERIC),2)
                        FROM   cte1, 
                               cte3";
                }
                // If it is monthly
                else if (requestType == 2)
                {
                    sql = @"WITH cte1 
                             ( 
                                  actualcount 
                             ) 
                             AS 
                             ( 
                                  WITH cte2 
                                       ( 
                                            dates 
                                       ) 
                                       AS 
                                       ( 
                                              SELECT Get_inbetween_workingdates(fromdate::date,todate::date) 
                                              FROM   leave 
                                              WHERE  employeeid=@Id 
                                              UNION ALL 
                                              SELECT Get_inbetween_workingdates(fromdate::date,todate::date) 
                                              FROM   onduty 
                                              WHERE  employeeid=@Id 
                                              UNION ALL 
                                              SELECT Get_inbetween_workingdates(fromdate::date,todate::date) 
                                              FROM   workfromhome 
                                              WHERE  employeeid=@Id 
                                              UNION ALL 
                                              SELECT     checkintime 
                                              FROM       regularlogin r 
                                              INNER JOIN jobfiling jf 
                                              ON         r.employeeid=jf.employeeid 
                                              INNER JOIN shift s 
                                              ON         jf.shiftid=s.id 
                                              WHERE      r.employeeid = @Id 
                                              AND        r.checkintime::time<=s.starttime::time 
                                       ) 
                            SELECT Count(dates) 
                            FROM   cte2 
                            WHERE  dates >CURRENT_DATE - interval '30 days' 
                             ) 
                             , 
                             cte3 
                             ( 
                                  totalcount 
                             ) 
                             AS 
                             ( 
                                  WITH cte4 
                                       ( 
                                            dates 
                                       ) 
                                       AS 
                                       ( 
                                              SELECT get_inbetween_workingdates(fromdate::date,todate::date) 
                                              FROM   leave 
                                              WHERE  employeeid=@Id 
                                              UNION ALL 
                                              SELECT get_inbetween_workingdates(fromdate::date,todate::date) 
                                              FROM   onduty 
                                              WHERE  employeeid=@Id 
                                              UNION ALL 
                                              SELECT get_inbetween_workingdates(fromdate::date,todate::date) 
                                              FROM   workfromhome 
                                              WHERE  employeeid=@Id 
                                              UNION ALL 
                                              SELECT checkintime 
                                              FROM   regularlogin 
                                              WHERE  employeeid = @Id 
                                       ) 
                                SELECT count(dates) 
                                FROM   cte4 
                                WHERE  dates >CURRENT_DATE - interval '30 days' 
                             ) 
                        SELECT ROUND(CAST((cast(actualcount AS float)/cast(totalcount AS float))*100 AS NUMERIC),2) 
                        FROM   cte1, 
                               cte3";
                }

                return await Connection.QueryFirstOrDefaultAsync<decimal>(sql, new { Id = employeeId });
            }
        }
    }
}