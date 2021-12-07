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
        public OverTimeRepository(IHttpContextAccessor httpContextAccessor, DbSession session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<OverTime>> GetAllOvertimeDetailsById(int employeeId)
        {
                var sql = "SELECT * FROM hrms.overtime WHERE employeeid=@Id";
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

        public async Task<int> InsertNotifyPersonnel(IEnumerable<OverTimeNotifyPersonnel> overTimeNotifyPersonnel)
        {
                var sql = new QueryBuilder<OverTimeNotifyPersonnel>().GenerateInsertQuery();
                sql = sql.Replace("RETURNING id", "");
                return await Connection.ExecuteAsync(sql, overTimeNotifyPersonnel);
        }
    }
}
