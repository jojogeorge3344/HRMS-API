using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class AttendanceReportRepository : GenericRepository<AttendanceReportView>, IAttendanceReportRepository
    {
        public AttendanceReportRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<AttendanceReportView>> GetAttendanceLogReport(DateTime fromDate, DateTime toDate)
        {
            using (Connection)
            {
                var sql = @"(SELECT DISTINCT e.id                                     AS employeeid,
                                              jb.employeenumber,
                                             ( Concat(e.firstname, ' ', e.lastname) )                AS employeename, 
                                             jb.department,
                                             Get_inbetween_workingdates(fromdate :: date, todate :: date) AS date,
                                             to_char( Get_inbetween_workingdates(fromdate :: date, todate :: date), 'Day') AS day,
                                             s.starttime                                             AS intime, 
                                             s.endtime                                               AS outtime,
                                             s.name                                                   AS shift,
                                             Concat(To_char(endtime - starttime, 'HH:MI'), ' hrs')    AS workinghours,
                                             'WFH'                                                    AS attendancetype
 
                             FROM   employee e 
                                    INNER JOIN jobdetails jb 
                                            ON e.id = jb.employeeid 
                                    INNER JOIN workfromhome wfh 
                                            ON e.id = wfh.employeeid 
                                    INNER JOIN jobfiling jf
                                            ON e.id=jf.employeeid
                                    INNER JOIN  shift s
                                            ON  s.id = jf.shiftid 
                             WHERE  wfh.fromdate :: date >= @fromdate 
                                    AND wfh.todate :: date <=@todate) 
                            UNION 
                            (SELECT DISTINCT e.id                                                     AS employeeid, 
                                             jb.employeenumber,
                                             ( Concat(e.firstname, ' ', e.lastname) )                 AS employeename, 
                                             jb.department, 
                                             cio.checkintime::date                                    AS date,
                                             to_char(cio.checkintime::date, 'Day')                    AS day,
                                             cio.checkintime                                          AS intime, 
                                             cio.checkouttime                                         AS outtime, 
							                 s.name                                                   AS shift,
                                              concat(to_char(format('%s:%s', round(extract('epoch' FROM checkouttime - checkintime) / 3600), to_char(checkouttime - checkintime, 'MI')) :: interval, 'HH24:MI'), ' hrs') AS workinghours,
                                             
                                            'Regular'                                                AS attendancetype 
                             FROM   employee e 
                                    INNER JOIN jobdetails jb 
                                            ON e.id = jb.employeeid 
                                    INNER JOIN regularlogin cio 
                                            ON e.id = cio.employeeid
							        INNER JOIN jobfiling jf
                                            ON e.id=jf.employeeid
                                    INNER JOIN  shift s
                                            ON  s.id = jf.shiftid 
                             WHERE  NOT cio.isremotelogin 
                                    AND cio.checkintime :: date >= @fromdate 
                                    AND cio.checkouttime :: date <= @todate) 
                            UNION 
                            (SELECT DISTINCT e.id                                                     AS employeeid, 
                                             ( Concat(e.firstname, ' ', e.lastname) )                 AS employeename,
                                              jb.employeenumber,
                                             jb.department, 
                                             cio.checkintime::date                                    AS date,
                                             to_char(cio.checkintime::date, 'Day')                    AS day,
                                             cio.checkintime                                          AS intime, 
                                             cio.checkouttime                                         AS outtime,
							                 s.name                                                   AS shift,
                                             Concat(To_char(endtime - starttime, 'HH:MI'), ' hrs')    AS workinghours,
                                             'Remote'                                                 AS attendancetype 
                             FROM   employee e 
                                    INNER JOIN jobdetails jb 
                                            ON e.id = jb.employeeid 
                                    INNER JOIN regularlogin cio 
                                            ON e.id = cio.employeeid 
							         INNER JOIN jobfiling jf
                                            ON e.id=jf.employeeid
                                    INNER JOIN  shift s
                                            ON  s.id = jf.shiftid 
                             WHERE  cio.isremotelogin 
                                    AND cio.checkintime :: date >= @fromdate 
                                    AND cio.checkouttime :: date <= @todate) 
                            UNION 
                            (SELECT DISTINCT e.id                                                    AS employeeid, 
                                             jb.employeenumber,
                                             ( Concat(e.firstname, ' ', e.lastname) )                AS employeename, 
                                             jb.department, 
                                             Get_inbetween_workingdates(fromdate :: date, todate :: date) AS date,
                                             to_char( Get_inbetween_workingdates(fromdate :: date, todate :: date), 'Day') AS day,
                                             s.starttime                                              AS intime, 
                                             s.endtime                                                AS outtime,
							                 s.name                                                   AS shift,
                                             Concat(To_char(endtime - starttime, 'HH:MI'), ' hrs')    AS workinghours,
                                             'On Duty'                                                AS attendancetype 
                             FROM   employee e 
                                    INNER JOIN jobdetails jb 
                                            ON e.id = jb.employeeid 
                                    INNER JOIN onduty od 
                                            ON e.id = od.employeeid 
							         INNER JOIN jobfiling jf
                                            ON e.id=jf.employeeid
                                    INNER JOIN  shift s
                                            ON  s.id = jf.shiftid 
                             WHERE  od.fromdate :: date >= @fromdate 
                                    AND od.todate :: date <= @todate) 
                            ORDER  BY intime DESC ";

                return await Connection.QueryAsync<AttendanceReportView>(sql, new { fromDate, toDate });
            }
        }
    }
}
