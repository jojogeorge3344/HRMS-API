using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class LeaveRepository : GenericRepository<Leave>, ILeaveRepository
    {
        public LeaveRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<int> InsertNotifyPersonnel(IEnumerable<LeaveNotifyPersonnel> leaveNotifyPersonnel)
        {
                var sql = new QueryBuilder<LeaveNotifyPersonnel>().GenerateInsertQuery();
                sql = sql.Replace("RETURNING id", "");

                return await Connection.ExecuteAsync(sql, leaveNotifyPersonnel);
        }

        public async Task<int> UpdateNotifyPersonnel(IEnumerable<LeaveNotifyPersonnel> leaveNotifyPersonnel)
        {
            var sql = new QueryBuilder<LeaveNotifyPersonnel>().GenerateUpdateQuery();
            return await Connection.ExecuteAsync(sql, leaveNotifyPersonnel);
        }

        public async Task<IEnumerable<LeaveComponentLeaveBalanceViewModel>> GetAllLeaveBalanceById(int employeeId)
        {
                var sql = @"SELECT lslc.leavestructureid, 
                                   lslc.leavecomponentid, 
                                   lc.NAME                                                     AS 
                                   leavecomponentname, 
                                   lc.code                                                     AS ShortCode, 
                                   lc.description, 
                                   ls.calendaryearstartdate, 
                                   lgs.annualleavequota, 
                                   ( lgs.annualleavequota - Sum(COALESCE(l.numberofdays, 0)) ) AS 
                                   LeaveBalance, 
                                   lc.isrestrictedtogender, 
                                   lc.restrictedtogender, 
                                   lc.isrestrictedtomaritalstatus, 
                                   lc.restrictedtomaritalstatus, 
                                   lc.isshowleavedescription, 
                                   e.gender, 
                                   e.maritalstatus 
                            FROM   hrms.HRMSEmployee e 
                                   INNER JOIN hrms.jobdetails jd 
                                           ON e.id = jd.employeeid 
                                   INNER JOIN hrms.jobfiling jf 
                                           ON jd.employeeid = jf.employeeid 
                                   INNER JOIN hrms.leavestructure ls 
                                           ON ls.id = jf.leavestructureid 
                                              AND jf.employeeid = @employeeId 
                                   INNER JOIN hrms.leavestructureleavecomponent lslc 
                                           ON jf.leavestructureid = lslc.leavestructureid 
                                   LEFT JOIN hrms.leavecomponentgeneralsettings lgs 
                                          ON ( lslc.leavestructureid = lgs.leavestructureid 
                                               AND lslc.leavecomponentid = lgs.leavecomponentid ) 
                                   INNER JOIN hrms.leavecomponent lc 
                                           ON lslc.leavecomponentid = lc.id 
                                   LEFT JOIN hrms.leave l 
                                          ON ( lgs.leavestructureid = l.leavestructureid 
                                               AND lgs.leavecomponentid = l.leavecomponentid ) 
                                             AND l.employeeid = @employeeId 
                            GROUP  BY lslc.leavestructureid, 
                                      lslc.leavecomponentid, 
                                      lc.NAME, 
                                      lc.code, 
                                      lc.description, 
                                      ls.calendaryearstartdate, 
                                      lgs.annualleavequota, 
                                      lc.isrestrictedtogender, 
                                      lc.restrictedtogender, 
                                      lc.isrestrictedtomaritalstatus, 
                                      lc.restrictedtomaritalstatus, 
                                      lc.isshowleavedescription, 
                                      e.gender, 
                                      e.maritalstatus 
                            ORDER  BY lc.NAME ";

                return await Connection.QueryAsync<LeaveComponentLeaveBalanceViewModel>(sql, new { employeeId });
        }

        public async Task<IEnumerable<Leave>> GetAllLeaveDetailsById(int employeeId)
        {
            var sql = @"SELECT le.*,em.firstname AS employeename,jd.employeenumber AS employeecode
                        FROM hrms.leave le
                        INNER JOIN hrms.hrmsemployee em
                        ON em.id = le.employeeid
                        INNER JOIN hrms.jobdetails jd
                        ON le.employeeid = jd.employeeid
                        WHERE le.employeeid = @employeeId 
                        AND le.isarchived = false 
                        ORDER BY id DESC";

                return await Connection.QueryAsync<Leave>(sql, new { employeeId });
        }

        public async Task<int> InsertUnmarkedAttendance(IEnumerable<Leave> leave)
        {
                var sql = new QueryBuilder<Leave>().GenerateInsertQuery();

                return await Connection.ExecuteAsync(sql, leave);
        }

        public async Task<IEnumerable<LeaveSettingsViewModel>> GetAllLeaveSettingsById(int employeeId)
        {
                    var sql = @"SELECT lgs.leavestructureid, 
                                       lgs.leavecomponentid, 
                                       maxconsecutivedays, 
                                       maxnumberofdayspermonth, 
                                       numberofdaysgaprequiredbetweenleaves, 
                                       noleavequotaafterjoiningday, 
                                       priornoticedays, 
                                       canapplyhalfday, 
                                       canemployeeapplyleave, 
                                       canapplyleaveduringprobation, 
                                       canapplyleaveduringnoticeperiod, 
                                       canapplyforfuturedate, 
                                       isleaveapprovalrequired, 
                                       dateofjoin, 
                                       probationperiod, 
                                       periodtype, 
                                       noticeperiod 
                                FROM   hrms.leavecomponentgeneralsettings lgs 
                                       INNER JOIN hrms.leavecomponentrestrictionsettings lrs 
                                               ON ( lgs.leavestructureid = lrs.leavestructureid 
                                                    AND lgs.leavecomponentid = lrs.leavecomponentid ) 
                                       INNER JOIN hrms.jobfiling jf 
                                               ON lrs.leavestructureid = jf.leavestructureid 
                                       INNER JOIN hrms.jobdetails jd 
                                               ON jf.employeeid = jd.employeeid 
                                                  AND jf.employeeid = @employeeId";

                    return await Connection.QueryAsync<LeaveSettingsViewModel>(sql, new { employeeId });
        }

        public async Task<IEnumerable<LeaveNotificationView>> GetApproverById(int leaveRequestId)
        {
                var sql = @"SELECT DISTINCT jd.reportingmanager as reportingmanager,
                                            (select count(le.id)  from hrms.jobdetails j
                                            INNER JOIN hrms.leave le
                                            ON j.employeeid = le.employeeid
                                            WHERE j.reportingmanager = jd.reportingmanager AND l.leavestatus = 2
                                            ) as pendingrequest FROM hrms.leave l
                                            INNER JOIN hrms.jobdetails jd
                                            ON jd.employeeid = l.employeeid
                                            WHERE l.id = @leaveRequestId";

                return await Connection.QueryAsync<LeaveNotificationView>(sql, new { leaveRequestId });
        }

        public async Task<IEnumerable<LeaveNotifyPersonnel>> GetAllNotifyPersonnelById(int leaveRequestId)
        {
            //var sql = "SELECT * FROM  hrms.leavenotifypersonnel WHERE leaveId = @leaveRequestId";

            var sql = @"SELECT  
             lp.id,
		     lp.leaveid,
		     lp.notifypersonnel,
		     ee.firstname
             FROM hrms.leavenotifypersonnel AS lp
             INNER JOIN hrms.leave AS l
             ON lp.leaveid = l.id
             INNER JOIN hrms.HRMSEmployee AS ee 
             ON lp.notifypersonnel = ee.id
             WHERE leaveid = @leaveRequestId
             AND lp.isarchived = false";

            return await Connection.QueryAsync<LeaveNotifyPersonnel>(sql, new { leaveRequestId });
        }

        public async Task<IEnumerable<Leave>> GetAllUnApprovedLeaveById(int employeeId)
        {
                var sql = @"SELECT l.* from hrms.leave l 
	                                        INNER JOIN hrms.jobdetails jd
                                            ON jd.employeeid = l.employeeid
                                            WHERE jd.reportingmanager = @employeeId
	                                        AND l.leavestatus = 2";

                return await Connection.QueryAsync<Leave>(sql, new { employeeId });
        }

        public async Task<IEnumerable<Leave>> GetAllLeaveInfoByEmployeeId(int employeeId)
        {
            var sql = @"SELECT employeeid,
                                    isfullday,
                                    isfirstdayfirsthalf,
                                    isfirstdaysecondhalf,
                                    isseconddayfirsthalf,
                                    isseconddaysecondhalf,
                                     fromdate,
                                      todate,
                                    approveddate
                                    FROM hrms.leave
                                    WHERE employeeid = @employeeid";
            return await Connection.QueryAsync<Leave>(sql, new { employeeId });
        }

        public async Task<IEnumerable<Leave>> GetAllLeaveDetails()
        {
            var sql = @"SELECT le.*,em.firstname AS employeename,jd.employeenumber AS employeecode
                        FROM hrms.leave le
                        INNER JOIN hrms.hrmsemployee em
                        ON em.id = le.employeeid
                        INNER JOIN hrms.jobdetails jd
                        ON le.employeeid = jd.employeeid
                        WHERE le.isarchived = false 
                        ORDER BY id DESC";

            return await Connection.QueryAsync<Leave>(sql);
        }
    }
}