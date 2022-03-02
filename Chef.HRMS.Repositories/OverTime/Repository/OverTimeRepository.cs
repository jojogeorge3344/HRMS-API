using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class OverTimeRepository : GenericRepository<OverTime>, IOverTimeRepository
    {
        public OverTimeRepository(IHttpContextAccessor httpContextAccessor, DbSession session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<DateTime>> AppliedDates(int employeeId)
        {
            var sql = $@"SELECT DISTINCT hrms.get_inbetween_days(fromdate::date,todate::date) AS applieddates
                    FROM hrms.overtime
                    WHERE employeeid=@employeeId";
            return await Connection.QueryAsync<DateTime>(sql, new {employeeId });
        }

        public async Task<IEnumerable<OverTime>> GetAllOvertimeDetailsById(int employeeId)
        {
                var sql = "SELECT * FROM hrms.overtime WHERE employeeid=@Id order by id desc";
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

        public async Task<IEnumerable<OvertimeViewModel>> GetOvertimeNotifyPersonnelByOvertimeId(int overtimeId)
        {
            var sql = @"SELECT  
		                        op.overtimeid,
		                        op.notifypersonnel,
		                        ee.firstname
                        FROM hrms.overtimenotifypersonnel as op
                        INNER JOIN hrms.overtime as ot ON op.overtimeid = ot.id
                        INNER JOIN hrms.employee as ee on op.notifypersonnel=ee.id
                        WHERE       overtimeId = @overtimeId";

            return await Connection.QueryAsync<OvertimeViewModel>(sql, new { overtimeId });
        }

      

        public async Task<int> InsertNotifyPersonnel(IEnumerable<OverTimeNotifyPersonnel> overTimeNotifyPersonnel)
        {
                var sql = new QueryBuilder<OverTimeNotifyPersonnel>().GenerateInsertQuery();
                sql = sql.Replace("RETURNING id", "");
                return await Connection.ExecuteAsync(sql, overTimeNotifyPersonnel);
        }
    }
}
