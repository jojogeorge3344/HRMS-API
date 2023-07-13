using Chef.Common.Models;
using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class LeaveAndAttendanceRepository : GenericRepository<LeaveAndAttendance>, ILeaveAndAttendanceRepository
    {
		private readonly ITenantSimpleUnitOfWork tenantSimpleUnitOfWork;
		private readonly ILeaveEligibilityRepository leaveEligibility;
		private readonly IPayrollComponentDetailsRepository payrollComponentDetailsRepository;

		public LeaveAndAttendanceRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session,
			ITenantSimpleUnitOfWork tenantSimpleUnitOfWork,
			ILeaveEligibilityRepository leaveEligibility,
            IPayrollComponentDetailsRepository payrollComponentDetailsRepository) : base(httpContextAccessor, session)
        {
            this.tenantSimpleUnitOfWork = tenantSimpleUnitOfWork;
            this.leaveEligibility = leaveEligibility;
            this.payrollComponentDetailsRepository = payrollComponentDetailsRepository;
		}

        public async Task<IEnumerable<LeaveAndAttendanceViewModel>> GetAllLeaveAndAttendanceByPaygroup(int paygroupId, DateTime fromDate, DateTime toDate,int payrollProcessId)
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
                                    FROM   hrms.HRMSEmployee e 
                                           INNER JOIN hrms.jobfiling jf 
                                                   ON e.id = jf.employeeid 
                                                      AND jf.paygroupid = @paygroupId 
                                           INNER JOIN hrms.jobdetails jd 
                                                   ON e.id = jd.employeeid 
                                           LEFT JOIN hrms.holiday h 
                                                  ON jf.holidaycategoryid = h.holidaycategoryid 
                                                     AND ( h.date BETWEEN @fromDate AND @toDate ) 
                                          WHERE e.id NOT IN(Select ppm.employeeid from hrms.payrollprocessingmethod ppm where((extract(month FROM @fromDate) = ppm.month)
                                                        AND
													    (extract(year FROM @fromDate) = ppm.year)) )
                                    GROUP  BY e.id, 
                                              jd.employeenumber, 
                                              jf.weekoff 
                                    ORDER  BY e.id)Q1 
                                   LEFT JOIN (SELECT jf.employeeid, 
                                                     Count(*) total 
                                              FROM   hrms.jobfiling jf 
                                                     LEFT JOIN hrms.regularlogin rl 
                                                            ON jf.employeeid = rl.employeeid 
                                                               AND jf.paygroupid = @paygroupId 
                                              WHERE  rl.checkintime BETWEEN @fromDate AND @toDate 
                                              GROUP  BY jf.employeeid 
                                              UNION 
                                              SELECT jf.employeeid, 
                                                     Count(*) total 
                                              FROM   hrms.jobfiling jf 
                                                     LEFT JOIN hrms.workfromhome wfh 
                                                            ON jf.employeeid = wfh.employeeid 
                                                               AND jf.paygroupid = @paygroupId 
                                              WHERE  wfh.fromdate >= @fromDate 
                                                     AND wfh.todate <= @toDate 
                                              GROUP  BY jf.employeeid 
                                              UNION 
                                              SELECT jf.employeeid, 
                                                     Count(*) total 
                                              FROM   hrms.jobfiling jf 
                                                     LEFT JOIN hrms.onduty od 
                                                            ON jf.employeeid = od.employeeid 
                                                               AND jf.paygroupid = @paygroupId 
                                              WHERE  od.fromdate >= @fromDate 
                                                     AND od.todate <= @toDate 
                                              GROUP  BY jf.employeeid)Q2 
                                          ON Q1.employeeid = Q2.employeeid 
                                   LEFT JOIN (SELECT jf.employeeid, 
                                                     Count(*)applied,l.id AS leaveid,l.leavecomponentid 
                                              FROM   hrms.jobfiling jf 
                                                     LEFT JOIN hrms.leave l 
                                                            ON jf.employeeid = l.employeeid 
                                                               AND jf.paygroupid = @paygroupId
                                                     INNER JOIN hrms.leavecomponent lc 
                                                             ON l.leavecomponentid = lc.id
												     INNER JOIN hrms.systemvariablevalues svv
                                                             ON l.employeeid = svv.employeeid
													 INNER JOIN hrms.systemvariable sv
													         ON svv.systemvariableid = sv.id
															 AND sv.code = 'Lop_Dys_Btw_Dte'
                                              WHERE  svv.payrollprocessid = @payrollProcessId
                                              GROUP  BY jf.employeeid,l.id,l.leavecomponentid)Q3 
                                          ON Q1.employeeid = Q3.employeeid 
                                   LEFT JOIN (SELECT jf.employeeid, 
                                                     Count(*)lop 
                                              FROM   hrms.jobfiling jf 
                                                     LEFT JOIN hrms.leave l 
                                                            ON jf.employeeid = l.employeeid 
                                                               AND jf.paygroupid = @paygroupId 
                                                     INNER JOIN hrms.leavecomponent lc 
                                                             ON l.leavecomponentid = lc.id 
                                              WHERE  ( l.fromdate >= @fromDate 
                                                       AND l.todate <= @toDate ) 
                                                     AND lc.code = 'LOP' 
                                              GROUP  BY jf.employeeid)Q4 
                                          ON Q1.employeeid = Q4.employeeid 
                                   LEFT JOIN (SELECT jf.employeeid, 
                                                     Count(*)pending 
                                              FROM   hrms.jobfiling jf 
                                                     LEFT JOIN hrms.leave l 
                                                            ON jf.employeeid = l.employeeid 
                                                               AND jf.paygroupid = @paygroupId 
                                                     INNER JOIN hrms.leavecomponent lc 
                                                             ON l.leavecomponentid = lc.id 
                                              WHERE  ( l.fromdate >= @fromDate 
                                                       AND l.todate <= @toDate ) 
                                                     AND l.leavestatus = 3 
                                              GROUP  BY jf.employeeid)Q5 
                                          ON Q1.employeeid = Q5.employeeid 
                                   LEFT JOIN (SELECT jf.employeeid, 
                                                     Count(*)approved 
                                              FROM   hrms.jobfiling jf 
                                                     LEFT JOIN hrms.leave l 
                                                            ON jf.employeeid = l.employeeid 
                                                               AND jf.paygroupid = @paygroupId 
                                                     INNER JOIN hrms.leavecomponent lc 
                                                             ON l.leavecomponentid = lc.id 
                                              WHERE  ( l.fromdate >= @fromDate 
                                                       AND l.todate <= @toDate ) 
                                                     AND l.leavestatus = 4 
                                              GROUP  BY jf.employeeid)Q6 
                                          ON Q1.employeeid = Q6.employeeid ";

                return await Connection.QueryAsync<LeaveAndAttendanceViewModel>(sql, new { paygroupId, fromDate, toDate, payrollProcessId });
        }

        public async Task<IEnumerable<LeaveDetailsViewModel>> GetAllApprovedLeaveDetailsByEmployeeId(int employeeId, DateTime fromDate, DateTime toDate)
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
                            FROM            hrms.leave l 
                            INNER JOIN      hrms.leavecomponent lc 
                            ON              lc.id = l.leavecomponentid 
                            INNER JOIN      hrms.HRMSEmployee e 
                            ON              l.approvedby = e.id 
                            WHERE           l.fromdate :: date >= @fromdate 
                            AND             l.todate ::   date <= @todate 
                            AND             l.employeeid = @employeeId 
                            AND             l.leavestatus = 3";

                return await Connection.QueryAsync<LeaveDetailsViewModel>(sql, new { employeeId, fromDate, toDate });
        }

        public async Task<IEnumerable<LeaveDetailsViewModel>> GetAllUnapprovedLeaveDetailsByEmployeeId(int employeeId, DateTime fromDate, DateTime toDate)
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
                            FROM   hrms.LEAVE l 
                                   INNER JOIN hrms.leavecomponent lc 
                                           ON lc.id = l.leavecomponentid 
                                   INNER JOIN hrms.HRMSEmployee e 
                                           ON l.approvedby = e.id 
                            WHERE  l.fromdate :: date >= @fromdate 
                                   AND l.todate :: date <= @todate 
                                   AND l.employeeid = @employeeid 
                                   AND ( l.leavestatus = 1 
                                          OR l.leavestatus = 2 ) ";

                return await Connection.QueryAsync<LeaveDetailsViewModel>(sql, new { employeeId, fromDate, toDate });
        }

        public async Task<IEnumerable<DateTime>> GetAllUnmarkedAttendanceDetailsByEmployeeId(int employeeId, DateTime fromDate, DateTime toDate)
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
                                                                   SELECT DISTINCT hrms.get_inbetween_workingdates(fromdate::date,todate::date) AS markeddates
                                                                   FROM            hrms.onduty 
                                                                   WHERE           employeeid = @employeeId 
                                                                   UNION 
                                                                   SELECT DISTINCT hrms.get_inbetween_workingdates(fromdate::date,todate::date) AS markeddates
                                                                   FROM            hrms.workfromhome 
                                                                   WHERE           employeeid = @employeeId 
                                                                   UNION 
                                                                   SELECT DISTINCT hrms.get_inbetween_workingdates(fromdate::date,todate::date) AS markeddates
                                                                   FROM            hrms.leave 
                                                                   WHERE           employeeid = @employeeId 
                                                                   AND             leavestatus != 5 
                                                                   UNION 
                                                                   SELECT DISTINCT checkintime::date AS markeddates 
                                                                   FROM            hrms.regularlogin 
                                                                   WHERE           employeeid = @employeeId 
                                                                   UNION 
                                                                   SELECT     date::date AS markeddates 
                                                                   FROM       hrms.holiday 
                                                                   INNER JOIN hrms.jobfiling jf 
                                                                   ON         jf.holidaycategoryid = holiday.holidaycategoryid
                                                                   AND        jf.employeeid = @employeeId 
                                                                   WHERE      date BETWEEN @fromDate AND        @toDate)SELECT markeddates 
                                        FROM   markeddays 
                                        WHERE  markeddates >= @fromDate 
                                        AND    markeddates <= @toDate )";

                return await Connection.QueryAsync<DateTime>(sql, new { employeeId, fromDate, toDate });
            
        }

        public async Task<int> GetNumberOfEmployeesByPaygroup(int paygroupId)
        {
                var sql = @"SELECT Count(*) 
                            FROM   hrms.jobfiling 
                            WHERE  paygroupid = @paygroupId ";

                return await Connection.QueryFirstOrDefaultAsync<int>(sql, new { paygroupId });
        }

        public async Task<int> InsertLeaveAndAttendanceDetails(IEnumerable<LeaveAndAttendance> leaveAndAttendances)
        {
            int result = 0;
            using (var transaction = Connection.BeginTransaction())
            {
                try
                {
                    if (leaveAndAttendances.Count() == 0)
                    {
                        var employeeId = leaveAndAttendances.Select(x => x.EmployeeId).FirstOrDefault();
                        var getEmp = "SELECT paygroupid from hrms.jobfiling where employeeid=@employeeId";
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
                            var sql = new QueryBuilder<LeaveAndAttendance>().GenerateInsertQuery(false);
                            //sql = sql.Replace("RETURNING id", "");
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
                        var sql = new QueryBuilder<LeaveAndAttendance>().GenerateInsertQuery(false);
                        //sql = sql.Replace("RETURNING id", "");
                        sql += " ON CONFLICT ON CONSTRAINT leaveandattendance_ukey_empid_pid_ppid DO ";
                        //sql += " ON CONFLICT DO ";
                        sql += new QueryBuilder<LeaveAndAttendance>().GenerateUpdateQueryOnConflict();

                        await Connection.ExecuteAsync(sql, leaveAndAttendances);
                    }
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    string msg = ex.Message;
                    transaction.Rollback();
                }

            }
            return result;
        }

        public async Task<IEnumerable<LeaveAndAttendance>> GetLeaveAndAttendanceByPayrollProcessingMethodId(int payrollProcessingMethodId)
        {
                var sql = @"SELECT * FROM hrms.leaveandattendance WHERE payrollProcessingMethodId = @payrollProcessingMethodId ";

                return await Connection.QueryAsync<LeaveAndAttendance>(sql, new { payrollProcessingMethodId });
        }

        public async Task<LeaveAndAttendance> GetLeaveAndAttendanceByEmployeeId(int employeeId, int payrollProcessingMethodId)
        {
                var sql = @"SELECT * FROM hrms.leaveandattendance WHERE employeeId=@employeeId AND payrollProcessingMethodId = @payrollProcessingMethodId ";

                return await Connection.QueryFirstAsync<LeaveAndAttendance>(sql, new { employeeId, payrollProcessingMethodId });
        }

        public async Task<IEnumerable<EmployeeAttendanceViewModel>> GetAllLeaveAndAttendanceByEmployeeId(int employeeId, DateTime fromDate, DateTime toDate)
        {
                var sql = @"SELECT 'totalworkingdays'                                            AS type, 
                                   Count(*)                                                      AS totalcount 
                            FROM   generate_series(@fromDate, @toDate, interval '1' day) AS t(dt) 
                            WHERE  extract(dow FROM dt) BETWEEN 1 AND    5 
                            UNION ALL 
                            SELECT     'holidaycount' AS type, 
                                       count(*)          holidaycount 
                            FROM       hrms.holiday h 
                            INNER JOIN hrms.jobfiling jf 
                            ON         h.holidaycategoryid=jf.holidaycategoryid 
                            AND        jf.employeeid=@employeeId 
                            WHERE      date BETWEEN @fromDate AND        @toDate 
                            UNION ALL 
                            SELECT 'workeddays' AS type, 
                                   sum(attendance) 
                            FROM   ( 
                                          SELECT count(*) AS attendance 
                                          FROM   hrms.regularlogin 
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
                                                                              SELECT DISTINCT hrms.get_inbetween_workingdates(fromdate::date,todate::date) AS days
                                                                              FROM            hrms.onduty 
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
                                                                                 SELECT DISTINCT hrms.get_inbetween_workingdates(fromdate::date,todate::date) AS days
                                                                                 FROM            hrms.workfromhome 
                                                                                 WHERE           employeeid = @employeeId 
                                                                                 AND             isapproved=true 
                                                                 )SELECT Count(*) AS attendance 
                                                 FROM  workfromhome 
                                                 WHERE  days BETWEEN @fromDate AND    @toDate))q1 
                            UNION ALL 
                                      ( 
                                           WITH lop 
                                                ( 
                                                     days 
                                                ) 
                                                AS 
                                                ( 
                                                                SELECT DISTINCT hrms.get_inbetween_workingdates(fromdate::date,todate::date) AS days
                                                                FROM   hrms.leave l 
                                                                       INNER JOIN hrms.leavecomponent lc 
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
                                                                   SELECT DISTINCT hrms.get_inbetween_workingdates(fromdate::date,todate::date) AS days
                                                                   FROM            hrms.leave 
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
                                                                      SELECT DISTINCT hrms.get_inbetween_workingdates(fromdate::date,todate::date) AS days,
                                                                                      leavestatus 
                                                                      FROM            hrms.leave 
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
                                                                         SELECT DISTINCT hrms.get_inbetween_workingdates(fromdate::date,todate::date) AS days,
                                                                                         leavestatus 
                                                                         FROM            hrms.leave 
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

        public async Task<IEnumerable<LOPCalculationView>> GetLOPCalculation(DateTime fromDate, DateTime toDate)
        {
            var sql = @"SELECT COUNT(*)AS lopcount,ld.employeeid,jf.paygroupid,escd.monthlyamount AS monthlyamount,
                        le.leavededuction AS payrollcomponentid,ld.leaveid,(COUNT(*) * (escd.monthlyamount)) AS totalamount
                        FROM hrms.leavedetails ld
                        INNER JOIN hrms.leavecomponent lc 
                        ON ld.leavecomponentid = lc.id
                        AND lc.isunpaidleave = true
                        INNER JOIN hrms.leaveeligibility le 
                        ON le.leavecomponentid = lc.id
                        INNER JOIN hrms.payrollcomponent pc 
                        ON pc.id = le.leavededuction
                        INNER JOIN hrms.employeesalaryconfigurationdetails escd 
                        ON escd.payrollcomponentid = pc.id
                        INNER JOIN hrms.jobfiling jf 
                        ON jf.employeeid = ld.employeeid
                        WHERE ld.leavedate BETWEEN @fromDate AND @toDate
                        GROUP BY escd.monthlyamount,ld.employeeid,jf.paygroupid,le.leavededuction,ld.leaveid"
            ;

            return await Connection.QueryAsync<LOPCalculationView>(sql, new { fromDate, toDate });
        }

        public async Task<IEnumerable<LOPCalculationView>> GetLOPCalculationDetail(int payGroupId, DateTime fromDate, DateTime toDate)
        {
            try
            {
                List<LOPCalculationView> lOPCalculationView = new List<LOPCalculationView>();
                string sql = @"SELECT JF.employeeid,PG.leavecutoff,JF.payrollstructureid 
                        FROM hrms.jobfiling JF
                        INNER JOIN hrms.hrmsemployee EM ON JF.employeeid = EM.id
                        INNER JOIN hrms.paygroup PG ON PG.id = JF.paygroupid
                        WHERE JF.paygroupid = @paygroupId AND JF.isarchived = false 
                        AND EM.isarchived = false AND PG.isarchived = false ";
                var EmpList = await Connection.QueryAsync<LOPEmployee>(sql, new { payGroupId });

                if (EmpList != null && EmpList.ToList().Count > 0)
                {
                    foreach (LOPEmployee item in EmpList)
                    {
                        sql = @"SELECT LD.leavecomponentid,COUNT(CASE WHEN LD.leavetype =1 THEN LD.leavetype END) + COUNT(CASE WHEN LD.leavetype =2 THEN LD.leavetype END)*.5 AS Days
                        FROM hrms.leavedetails LD 
                        WHERE LD.leavestatus = 4 AND To_date(Cast(LD.leavedate AS TEXT), 'YYYY-MM-DD') BETWEEN @fromDate AND @toDate
                          AND LD.employeeid =  @employeeid
                          AND LD.isarchived = false
                        GROUP BY LD.leavecomponentid ";
                        var LeaveDet = await Connection.QueryAsync<LOPDetails>(sql, new { employeeid = item.EmployeeId, fromDate, toDate });
                        if (LeaveDet != null && LeaveDet.ToList().Count > 0)
                        {
                            foreach (LOPDetails detail in LeaveDet)
                            {
                                //need to find leave cut off type based on leave component -- from leaveeligiblity -- entry not properly going on update
                                var leaveCutOff = await leaveEligibility.GetLeaveConfiguration(detail.LeaveComponentId);
                                int lCutOff = (int)leaveCutOff.Select(x => x.LeaveCutOffType).ToList().FirstOrDefault();
                                //yearEnd = 1,MonthEnd = 2,QuarterEnd = 3,HalfYearEnd = 4,NotApplicable = 5

                                //need to find tot leaves based on leave cut off 

                                int Year = toDate.Year;
                                int Month = toDate.Month;
                                int Date = toDate.Day;

                                DateTime YearStart = new DateTime(Year - 1, 12, Date);
                                DateTime QStart = new DateTime(Year - 1,12, Date);
								DateTime QEnd = new DateTime(Year , 3, Date);
								switch (Month)
                                {
                                    case 1:
                                    case 2:
                                    case 3:
                                        QStart = new DateTime(Year - 1, 12, Date);
										QEnd = new DateTime(Year, 3, Date);
										break;
                                    case 4:
                                    case 5:
                                    case 6:
                                        QStart = new DateTime(Year, 3, Date);
										QEnd = new DateTime(Year, 6, Date);
										break;
                                    case 7:
                                    case 8:
                                    case 9:
                                        QStart = new DateTime(Year, 6, Date);
										QEnd = new DateTime(Year, 9, Date);
										break;
                                    case 10:
                                    case 11:
                                    case 12:
                                        QStart = new DateTime(Year, 9, Date);
										QEnd = new DateTime(Year, 12, Date);
										break;
                                }

								DateTime HStart = new DateTime(Year - 1, 12, Date);
								DateTime HEnd = new DateTime(Year, 6, Date);
								switch (Month)
								{
									case 1:
									case 2:
									case 3:
									case 4:
									case 5:
									case 6:
										QStart = new DateTime(Year - 1, 12, Date);
										QEnd = new DateTime(Year, 6, Date);
										break;
									case 7:
									case 8:
									case 9:
									case 10:
									case 11:
									case 12:
										QStart = new DateTime(Year, 6, Date);
										QEnd = new DateTime(Year, 12, Date);
										break;
								}

								switch (lCutOff)
                                {
                                    case 1:
                                        sql = @"SELECT LD.leavecomponentid,COUNT(CASE WHEN LD.leavetype =1 THEN LD.leavetype END) + COUNT(CASE WHEN LD.leavetype =2 THEN LD.leavetype END)*.5 AS Days
                                        FROM hrms.leavedetails LD 
                                        WHERE LD.employeeid =  @employeeid
                                        AND LD.isarchived = false
                                        AND LD.leavestatus = 4
						                AND LD.leaveComponentid = @leaveComponentid 
                                        AND To_date(Cast(LD.leavedate AS TEXT), 'YYYY-MM-DD') BETWEEN @YearStart AND @toDate
                                        GROUP BY LD.leavecomponentid ";
                                        break;
									case 2:
										sql = @"SELECT LD.leavecomponentid,COUNT(CASE WHEN LD.leavetype =1 THEN LD.leavetype END) + COUNT(CASE WHEN LD.leavetype =2 THEN LD.leavetype END)*.5 AS Days
                                        FROM hrms.leavedetails LD 
                                        WHERE LD.employeeid =  @employeeid
                                        AND LD.isarchived = false
                                        AND LD.leavestatus = 4
						                AND LD.leaveComponentid = @leaveComponentid 
                                        AND To_date(Cast(LD.leavedate AS TEXT), 'YYYY-MM-DD') BETWEEN @fromDate AND @toDate
                                        GROUP BY LD.leavecomponentid ";
										break;
									case 3:
										sql = @"SELECT LD.leavecomponentid,COUNT(CASE WHEN LD.leavetype =1 THEN LD.leavetype END) + COUNT(CASE WHEN LD.leavetype =2 THEN LD.leavetype END)*.5 AS Days
                                        FROM hrms.leavedetails LD 
                                        WHERE LD.employeeid =  @employeeid
                                        AND LD.isarchived = false
                                        AND LD.leavestatus = 4
						                AND LD.leaveComponentid = @leaveComponentid 
                                        AND To_date(Cast(LD.leavedate AS TEXT), 'YYYY-MM-DD') BETWEEN @QStart AND @QEnd
                                        GROUP BY LD.leavecomponentid ";
										break;
									case 4:
										sql = @"SELECT LD.leavecomponentid,COUNT(CASE WHEN LD.leavetype =1 THEN LD.leavetype END) + COUNT(CASE WHEN LD.leavetype =2 THEN LD.leavetype END)*.5 AS Days
                                        FROM hrms.leavedetails LD 
                                        WHERE LD.employeeid =  @employeeid
                                        AND LD.isarchived = false
                                        AND LD.leavestatus = 4
						                AND LD.leaveComponentid = @leaveComponentid 
                                        AND To_date(Cast(LD.leavedate AS TEXT), 'YYYY-MM-DD') BETWEEN @HStart AND @HEnd
                                        GROUP BY LD.leavecomponentid ";
										break;
									case 5:
										sql = @"SELECT LD.leavecomponentid,COUNT(CASE WHEN LD.leavetype =1 THEN LD.leavetype END) + COUNT(CASE WHEN LD.leavetype =2 THEN LD.leavetype END)*.5 AS Days
                                        FROM hrms.leavedetails LD 
                                        WHERE LD.employeeid =  @employeeid
                                        AND LD.isarchived = false
                                        AND LD.leavestatus = 4
						                AND LD.leaveComponentid = @leaveComponentid 
                                        AND To_date(Cast(LD.leavedate AS TEXT), 'YYYY-MM-DD') BETWEEN @YearStart AND @toDate
                                        GROUP BY LD.leavecomponentid ";
										break;
										//To do month wise,quarter, half year
								}
                                var LeaveTypeDet = await Connection.QueryAsync<LOPDetails>(sql, new
                                {
                                    employeeid = item.EmployeeId,
                                    fromDate,
                                    toDate,
                                    QStart, QEnd,HStart, HEnd,
                                    leaveComponentid = detail.LeaveComponentId,
                                    YearStart
                                });

                                decimal TotLeaveCount = LeaveTypeDet.ToList().Select(x => x.Days).FirstOrDefault();
                                decimal CurrentLeaves = detail.Days;
                                decimal SlabStart = TotLeaveCount - CurrentLeaves + 1;


                                sql = @"SELECT PC.maximumlimit ,PC.payrollcomponentid
                                FROM hrms.leavecomponentlopdetails LCD
                                INNER JOIN hrms.payrollcomponentconfiguration PC ON PC.payrollcomponentid = LCD.payrollcomponentid
                                INNER JOIN hrms.payrollcomponent CM ON CM.id =  PC.payrollcomponentid
                                WHERE LCD.leavecomponentid = @leavecomponentid AND 
                                PC.isarchived = false AND CM.isarchived = false
                                AND PC.payrollstructureid = @payrollstructureid";
                                var payrollComp = await Connection.QueryAsync<LOPPayrollComponent>(sql, new { leavecomponentid = detail.LeaveComponentId, item.PayrollStructureId });
                                if (payrollComp != null && payrollComp.ToList().Count > 0)
                                {
                                    decimal DedAmt = 0;
                                    foreach (LOPPayrollComponent comp in payrollComp)
                                    {
                                        //need to find the slab on the current month
                                        sql = @"SELECT LS.lowerlimit,LS.upperlimit,LS.valuetype,LS.valuevariable 
                                                FROM hrms.leaveslab LS 
                                                WHERE LS.leavecomponentid = @leavecomponentid AND LS.isarchived = false";
                                        var leaveSlabs = await Connection.QueryAsync<LeaveSlab>(sql, new { leavecomponentid = detail.LeaveComponentId });
                                        if (leaveSlabs != null && leaveSlabs.ToList().Count > 0)
                                        {
                                            foreach (LeaveSlab slab in leaveSlabs)
                                            {
                                                if (SlabStart >= slab.LowerLimit)
                                                {
                                                    if (TotLeaveCount > slab.UpperLimit)
                                                    {
                                                        SlabStart = slab.UpperLimit + 1;
                                                        Decimal SlabCount = slab.UpperLimit - SlabStart + 1;
                                                        DedAmt += (SlabCount * slab.ValueVariable * comp.MaximumLimit) / 100;
                                                    }
                                                    else
                                                    {
                                                        Decimal SlabCount = SlabStart - slab.LowerLimit - 1;
                                                        DedAmt += (SlabCount * slab.ValueVariable * comp.MaximumLimit) / 100;
                                                    }
                                                }
                                            }
                                        }
                                        else
                                        {
                                            DedAmt += (CurrentLeaves * comp.MaximumLimit);

										}
                                        LOPCalculationView details = new LOPCalculationView
                                        {

                                            LOPCount = (int)CurrentLeaves,
                                            EmployeeId = item.EmployeeId,
                                            PayGroupId = payGroupId,
                                            MonthlyAmount = (double)comp.MaximumLimit,
                                            PayrollComponentId = comp.PayrollComponentId,
                                            LeaveId = detail.LeaveComponentId,
                                            TotalAmount = (double)DedAmt
                                        };
                                        lOPCalculationView.Add(details);
                                    }
                                }
                                else
                                {
                                    throw new Exception("Leave component not set up for the leave type!");
                                }
                            }
                        }
                    }
                }
                return lOPCalculationView;
			}
			catch (Exception)
			{
				throw;
			}
		}

	}
}
