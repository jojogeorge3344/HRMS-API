using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class OverTimeRepository : GenericRepository<OverTime>, IOverTimeRepository
    {
        public OverTimeRepository(DbSession session) : base(session)
        {
        }

        public async Task<IEnumerable<OverTime>> GetAllOvertimeDetailsById(int employeeId)
        {
            using (Connection)
            {
                var sql = "SELECT * FROM overtime WHERE employeeid=@Id";
                return await Connection.QueryAsync<OverTime>(sql, new { Id = employeeId });
            }
        }
        public async Task<int> GetAssignedOverTimePolicy(int employeeId)
        {
            using (Connection)
            {
                var sql = @"SELECT DISTINCT overtimepolicyid 
                                    FROM PUBLIC.jobfiling
                                    WHERE employeeid=@employeeId
                                    ORDER  BY overtimepolicyid ASC";

                return await Connection.QueryFirstOrDefaultAsync<int>(sql, new { employeeId });
            }
        }

        public async Task<int> InsertNotifyPersonnel(IEnumerable<OverTimeNotifyPersonnel> overTimeNotifyPersonnel)
        {
            using (Connection)
            {
                var sql = new QueryBuilder<OverTimeNotifyPersonnel>().GenerateInsertQuery();
                sql = sql.Replace("RETURNING id", "");
                return await Connection.ExecuteAsync(sql, overTimeNotifyPersonnel);
            }
        }
    }
}
