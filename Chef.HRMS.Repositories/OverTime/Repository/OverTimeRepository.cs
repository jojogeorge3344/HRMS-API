using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class OverTimeRepository : GenericRepository<OverTime>, IOverTimeRepository
    {
        public OverTimeRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<OverTime>> GetAllOvertimeDetailsById(int employeeId)
        {
                var sql = "SELECT * FROM hrms.overtime WHERE employeeid=@Id and isarchived = false order by id desc";
                return await Connection.QueryAsync<OverTime>(sql, new { Id = employeeId });
        }
        public async Task<int> GetAssignedOverTimePolicy(int employeeId)
        {
                var sql = @"SELECT DISTINCT overtimepolicyid 
                                    FROM hrms.jobfiling
                                    WHERE employeeid=@employeeId
                                    ORDER  BY overtimepolicyid ASC";

                return await Connection.QueryFirstOrDefaultAsync<int>(sql, new { employeeId });
        }

        public async Task<IEnumerable<CalenderView>> GetCalenderDetails(int employeeId)
        {
            var sql = @"SELECT jf.*,s.breakduration,s.name AS shiftname,
                        s.numberofdays,s.starttime AS shiftstarttime,
                        s.endtime AS shiftendtime,hc.name AS holidaycategoryname,
                        h.description AS holidaydescription,h.date AS holidaydate,
                        h.name AS holidayname,otp.name AS overtimepolicycode,
                        otp.description AS overtimepolicyname
                        FROM hrms.jobfiling jf
                        INNER JOIN hrms.shift s
                        ON jf.shiftid = s.id
                        INNER JOIN hrms.holidaycategory hc
                        ON hc.id = jf.holidaycategoryid
                        INNER JOIN hrms.overtimepolicy otp
                        ON otp.id = jf.overtimepolicyid
                        LEFT JOIN hrms.holiday h
                        ON h.holidaycategoryid = hc.id
                        WHERE jf.employeeid = @employeeId
                        AND jf.isarchived = false";

            return await Connection.QueryAsync<CalenderView>(sql, new { employeeId });
        }

        public async Task<IEnumerable<OvertimeViewModel>> GetOvertimeNotifyPersonnelByOvertimeId(int overtimeId)
        {
            var sql = @"SELECT  
		                        op.overtimeid,
		                        op.notifypersonnel,
		                        ee.firstname
                         FROM hrms.overtimenotifypersonnel AS op
                         INNER JOIN hrms.overtime AS ot
                         ON op.overtimeid = ot.id
                         INNER JOIN hrms.HRMSEmployee AS ee 
                         ON op.notifypersonnel = ee.id
                         WHERE overtimeId = @overtimeId
                         AND op.isarchived = false";

            return await Connection.QueryAsync<OvertimeViewModel>(sql, new { overtimeId });
        }

      

        public async Task<int> InsertNotifyPersonnel(IEnumerable<OverTimeNotifyPersonnel> overTimeNotifyPersonnel)
        {
                var sql = new QueryBuilder<OverTimeNotifyPersonnel>().GenerateInsertQuery();
                sql = sql.Replace("RETURNING id", "");
                return await Connection.ExecuteAsync(sql, overTimeNotifyPersonnel);
        }

        public async Task<int> UpdateNotifyPersonnel(IEnumerable<OverTimeNotifyPersonnel> overTimeNotifyPersonnel)
        {
            var sql = new QueryBuilder<OverTimeNotifyPersonnel>().GenerateUpdateQuery();
            sql = sql.Replace("RETURNING id", "");
            return await Connection.ExecuteAsync(sql, overTimeNotifyPersonnel);
        }
    }
}
