using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class OverTimePolicyConfigurationRepository : GenericRepository<OverTimePolicyConfiguration>, IOverTimePolicyConfigurationRepository
    {
        public OverTimePolicyConfigurationRepository(DbSession session) : base(session)
        {
        }

        public async Task<IEnumerable<int>> GetAllAssignedOverTimePolicies()
        {
            using (Connection)
            {
                var sql = @"SELECT DISTINCT overtimepolicyid 
                                    FROM hrms.overtimepolicyconfiguration
                                    ORDER  BY overtimepolicyid ASC";

                return await Connection.QueryAsync<int>(sql);
            }
        }

        public async Task<OverTimePolicyConfiguration> GetByOverTimePolicyId(int overTimePolicyId)
        {
            using (Connection)
            {
                var sql = @"SELECT * 
                            FROM   hrms.overtimepolicyconfiguration 
                            WHERE  overtimepolicyid = @overTimePolicyId";

                return await Connection.QueryFirstOrDefaultAsync<OverTimePolicyConfiguration>(sql, new { overTimePolicyId });
            }
        }

        public async Task<OverTimePolicyConfiguration> GetOvertimeConfigurationById(int employeeId)
        {
            using (Connection)
            {
                var sql = @"SELECT * 
                            FROM   hrms.overtimepolicyconfiguration A 
                                   INNER JOIN hrms.jobfiling B 
                                           ON A.overtimepolicyid = B.overtimepolicyid 
                            WHERE  B.employeeid = @employeeId";

                return await Connection.QueryFirstOrDefaultAsync<OverTimePolicyConfiguration>(sql, new { employeeId });
            }
        }
    }
}
