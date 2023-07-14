namespace Chef.HRMS.Repositories;

public class AttendanceReportRepository : GenericRepository<AttendanceReportView>, IAttendanceReportRepository
{
    public AttendanceReportRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }

    public async Task<IEnumerable<AttendanceReportView>> GetAttendanceLogReport(DateTime fromDate, DateTime toDate)
    {
        var sql = @"(SELECT DISTINCT e.id                                     AS employeeid,
                                              jb.employeenumber,
                                             ( Concat(e.firstname, ' ', e.lastname) )                AS employeename, 
                                             jb.department,
                                             hrms.Get_inbetween_workingdates(fromdate :: date, todate :: date) AS date,
                                             to_char( hrms.Get_inbetween_workingdates(fromdate :: date, todate :: date), 'Day') AS day,
                                             s.starttime                                             AS intime, 
                                             s.endtime                                               AS outtime,
                                             s.name                                                   AS shift,
                                             Concat(To_char(endtime - starttime, 'HH:MI'), ' hrs')    AS workinghours,
                                             'WFH'                                                    AS attendancetype
 
                             FROM   hrms.HRMSEmployee e 
                                    INNER JOIN hrms.jobdetails jb 
                                            ON e.id = jb.employeeid 
                                    INNER JOIN hrms.workfromhome wfh 
                                            ON e.id = wfh.employeeid 
                                    INNER JOIN hrms.jobfiling jf
                                            ON e.id=jf.employeeid
                                    INNER JOIN  hrms.shift s
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
                             FROM   hrms.HRMSEmployee e 
                                    INNER JOIN hrms.jobdetails jb 
                                            ON e.id = jb.employeeid 
                                    INNER JOIN hrms.regularlogin cio 
                                            ON e.id = cio.employeeid
							        INNER JOIN hrms.jobfiling jf
                                            ON e.id=jf.employeeid
                                    INNER JOIN  hrms.shift s
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
                             FROM   hrms.HRMSEmployee e 
                                    INNER JOIN hrms.jobdetails jb 
                                            ON e.id = jb.employeeid 
                                    INNER JOIN hrms.regularlogin cio 
                                            ON e.id = cio.employeeid 
							         INNER JOIN hrms.jobfiling jf
                                            ON e.id=jf.employeeid
                                    INNER JOIN  hrms.shift s
                                            ON  s.id = jf.shiftid 
                             WHERE  cio.isremotelogin 
                                    AND cio.checkintime :: date >= @fromdate 
                                    AND cio.checkouttime :: date <= @todate) 
                            UNION 
                            (SELECT DISTINCT e.id                                                    AS employeeid, 
                                             jb.employeenumber,
                                             ( Concat(e.firstname, ' ', e.lastname) )                AS employeename, 
                                             jb.department, 
                                             hrms.Get_inbetween_workingdates(fromdate :: date, todate :: date) AS date,
                                             to_char( hrms.Get_inbetween_workingdates(fromdate :: date, todate :: date), 'Day') AS day,
                                             s.starttime                                              AS intime, 
                                             s.endtime                                                AS outtime,
							                 s.name                                                   AS shift,
                                             Concat(To_char(endtime - starttime, 'HH:MI'), ' hrs')    AS workinghours,
                                             'On Duty'                                                AS attendancetype 
                             FROM   hrms.HRMSEmployee e 
                                    INNER JOIN hrms.jobdetails jb 
                                            ON e.id = jb.employeeid 
                                    INNER JOIN hrms.onduty od 
                                            ON e.id = od.employeeid 
							         INNER JOIN hrms.jobfiling jf
                                            ON e.id=jf.employeeid
                                    INNER JOIN  hrms.shift s
                                            ON  s.id = jf.shiftid 
                             WHERE  od.fromdate :: date >= @fromdate 
                                    AND od.todate :: date <= @todate) 
                            ORDER  BY intime DESC ";

        return await Connection.QueryAsync<AttendanceReportView>(sql, new { fromDate, toDate });
    }
}
