using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class LeaveRepository : GenericRepository<Leave>, ILeaveRepository
    {
        public LeaveRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<int> InsertNotifyPersonnel(IEnumerable<LeaveNotifyPersonnel> leaveNotifyPersonnel)
        {
            using (Connection)
            {
                var sql = new QueryBuilder<LeaveNotifyPersonnel>().GenerateInsertQuery();
                sql = sql.Replace("RETURNING id", "");

                return await Connection.ExecuteAsync(sql, leaveNotifyPersonnel);
            }
        }

        public async Task<IEnumerable<LeaveComponentLeaveBalanceViewModel>> GetAllLeaveBalanceById(int employeeId)
        {
            using (Connection)
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
                                   lc.showleavedescription, 
                                   e.gender, 
                                   e.maritalstatus 
                            FROM   employee e 
                                   INNER JOIN jobdetails jd 
                                           ON e.id = jd.employeeid 
                                   INNER JOIN jobfiling jf 
                                           ON jd.employeeid = jf.employeeid 
                                   INNER JOIN leavestructure ls 
                                           ON ls.id = jf.leavestructureid 
                                              AND jf.employeeid = @employeeId 
                                   INNER JOIN leavestructureleavecomponent lslc 
                                           ON jf.leavestructureid = lslc.leavestructureid 
                                   LEFT JOIN leavecomponentgeneralsettings lgs 
                                          ON ( lslc.leavestructureid = lgs.leavestructureid 
                                               AND lslc.leavecomponentid = lgs.leavecomponentid ) 
                                   INNER JOIN leavecomponent lc 
                                           ON lslc.leavecomponentid = lc.id 
                                   LEFT JOIN leave l 
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
                                      lc.showleavedescription, 
                                      e.gender, 
                                      e.maritalstatus 
                            ORDER  BY lc.NAME ";

                return await Connection.QueryAsync<LeaveComponentLeaveBalanceViewModel>(sql, new { employeeId });
            }
        }

        public async Task<IEnumerable<Leave>> GetAllLeaveDetailsById(int employeeId)
        {
            using (Connection)
            {
                var sql = "SELECT * FROM  leave WHERE employeeid = @employeeId";

                return await Connection.QueryAsync<Leave>(sql, new { employeeId });
            }
        }

        public async Task<int> InsertUnmarkedAttendance(IEnumerable<Leave> leave)
        {
            using (Connection)
            {
                var sql = new QueryBuilder<Leave>().GenerateInsertQuery();

                return await Connection.ExecuteAsync(sql, leave);
            }
        }

        public async Task<IEnumerable<LeaveSettingsViewModel>> GetAllLeaveSettingsById(int employeeId)
        {
            using (Connection)
            {
                using (Connection)
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
                                FROM   leavecomponentgeneralsettings lgs 
                                       INNER JOIN leavecomponentrestrictionsettings lrs 
                                               ON ( lgs.leavestructureid = lrs.leavestructureid 
                                                    AND lgs.leavecomponentid = lrs.leavecomponentid ) 
                                       INNER JOIN jobfiling jf 
                                               ON lrs.leavestructureid = jf.leavestructureid 
                                       INNER JOIN jobdetails jd 
                                               ON jf.employeeid = jd.employeeid 
                                                  AND jf.employeeid = @employeeId";

                    return await Connection.QueryAsync<LeaveSettingsViewModel>(sql, new { employeeId });
                }
            }
        }

        public async Task<IEnumerable<LeaveNotificationView>> GetApproverById(int leaveRequestId)
        {
            using (Connection)
            {
                var sql = @"SELECT DISTINCT jd.reportingmanager as reportingmanager,
                                            (select count(le.id)  from jobdetails j
                                            INNER JOIN leave le
                                            ON j.employeeid = le.employeeid
                                            WHERE j.reportingmanager = jd.reportingmanager AND l.leavestatus = 2
                                            ) as pendingrequest FROM leave l
                                            INNER JOIN jobdetails jd
                                            ON jd.employeeid = l.employeeid
                                            WHERE l.id = @leaveRequestId";

                return await Connection.QueryAsync<LeaveNotificationView>(sql, new { leaveRequestId });
            }
        }

        public async Task<IEnumerable<LeaveNotifyPersonnel>> GetAllNotifyPersonnelById(int leaveRequestId)
        {

            using (Connection)
            {
                var sql = "SELECT * FROM  leavenotifypersonnel WHERE leaveId = @leaveRequestId";

                return await Connection.QueryAsync<LeaveNotifyPersonnel>(sql, new { leaveRequestId });
            }
        }

        public async Task<IEnumerable<Leave>> GetAllUnApprovedLeaveById(int employeeId)
        {
            using (Connection)
            {
                var sql = @"SELECT l.* from leave l 
	                                        INNER JOIN jobdetails jd
                                            ON jd.employeeid = l.employeeid
                                            WHERE jd.reportingmanager = @employeeId
	                                        AND l.leavestatus = 2";

                return await Connection.QueryAsync<Leave>(sql, new { employeeId });
            }
        }
    }
}