﻿using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class OverTimePolicyConfigurationRepository : GenericRepository<OverTimePolicyConfiguration>, IOverTimePolicyConfigurationRepository
    {
        public OverTimePolicyConfigurationRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<int>> GetAllAssignedOverTimePolicies()
        {
            using (Connection)
            {
                var sql = @"SELECT DISTINCT overtimepolicyid 
                                    FROM PUBLIC.overtimepolicyconfiguration
                                    ORDER  BY overtimepolicyid ASC";

                return await Connection.QueryAsync<int>(sql);
            }
        }

        public async Task<OverTimePolicyConfiguration> GetByOverTimePolicyId(int overTimePolicyId)
        {
            using (Connection)
            {
                var sql = @"SELECT * 
                            FROM   overtimepolicyconfiguration 
                            WHERE  overtimepolicyid = @overTimePolicyId";

                return await Connection.QueryFirstOrDefaultAsync<OverTimePolicyConfiguration>(sql, new { overTimePolicyId });
            }
        }

        public async Task<OverTimePolicyConfiguration> GetOvertimeConfigurationById(int employeeId)
        {
            using (Connection)
            {
                var sql = @"SELECT * 
                            FROM   OverTimePolicyConfiguration A 
                                   INNER JOIN jobfiling B 
                                           ON A.overtimepolicyid = B.overtimepolicyid 
                            WHERE  B.employeeid = @employeeId";

                return await Connection.QueryFirstOrDefaultAsync<OverTimePolicyConfiguration>(sql, new { employeeId });
            }
        }
    }
}