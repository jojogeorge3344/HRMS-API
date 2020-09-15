using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class OverTimePolicyRepository : GenericRepository<OverTimePolicy>, IOverTimePolicyRepository
    {
        public OverTimePolicyRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<int>> GetAllAssignedOverTimePolicy()
        {
            using (Connection)
            {
                var sql = @"SELECT DISTINCT overtimepolicyid 
                                    FROM PUBLIC.jobfiling
                                    ORDER  BY overtimepolicyid ASC";

                return await Connection.QueryAsync<int>(sql);
            }
        }

        public async Task<IEnumerable<OverTimePolicy>> GetAllAssignedOverTimePolicyCount()
        {
            using (Connection)
            {
                var sql = @"SELECT otp.id, 
                                   otp.NAME, 
                                   otp.description, 
                                   otp.createddate, 
                                   otp.modifieddate, 
                                   otp.createdby, 
                                   otp.modifiedby, 
                                   otp.isarchived, 
                                   otp.attendancehourstype, 
                                   otp.isconfigured, 
                                   (SELECT Count(overtimepolicyid) 
                                    FROM   PUBLIC.jobfiling jf 
                                    WHERE  jf.overtimepolicyid = otp.id 
                                    GROUP  BY overtimepolicyid) AS NumberOfEmployees 
                            FROM   overtimepolicy otp";

                return await Connection.QueryAsync<OverTimePolicy>(sql);
            }
        }

        public async Task<IEnumerable<OverTimePolicy>> GetAllConfiguredOvertimePolicies()
        {
            using (Connection)
            {
                var sql = @"SELECT * 
                                    FROM PUBLIC.overtimepolicy
                                    WHERE isconfigured=true";

                return await Connection.QueryAsync<OverTimePolicy>(sql);
            }
        }

        public async Task<int> UpdateOverTimePolicy(int id)
        {
            using (Connection)
            {
                var sql = @"UPDATE PUBLIC.overtimepolicy
                                   SET isconfigured=true
                                    WHERE id=@id";

                return await Connection.ExecuteAsync(sql, new { id });
            }
        }
    }
}
