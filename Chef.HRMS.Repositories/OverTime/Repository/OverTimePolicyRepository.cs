using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class OverTimePolicyRepository : GenericRepository<OverTimePolicy>, IOverTimePolicyRepository
    {
        public OverTimePolicyRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<int>> GetAllAssignedOverTimePolicy()
        {
                var sql = @"SELECT DISTINCT overtimepolicyid 
                                    FROM hrms.jobfiling
                                    ORDER  BY overtimepolicyid ASC";

                return await Connection.QueryAsync<int>(sql);
        }

        public async Task<IEnumerable<OverTimePolicy>> GetAllAssignedOverTimePolicyCount()
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
                                    FROM   hrms.jobfiling jf 
                                    WHERE  jf.overtimepolicyid = otp.id 
                                    GROUP  BY overtimepolicyid) AS NumberOfEmployees 
                            FROM   hrms.overtimepolicy otp where otp.isarchived =false";   // Added where otp.isarchived =false  by Nir 

            return await Connection.QueryAsync<OverTimePolicy>(sql);
        }

        public async Task<IEnumerable<OverTimePolicy>> GetAllConfiguredOvertimePolicies()
        {
                var sql = @"SELECT * 
                                    FROM hrms.overtimepolicy
                                    WHERE isconfigured=true";

                return await Connection.QueryAsync<OverTimePolicy>(sql);
        }

        public async Task<IEnumerable<BenefitTypes>> GetBenefitType()
        {
            var sql = @"SELECT * FROM hrms.benefittypes WHERE id IN(8,9,10)";

            return await Connection.QueryAsync<BenefitTypes>(sql);
        }

        public async Task<int> UpdateOverTimePolicy(int id)
        {
                var sql = @"UPDATE hrms.overtimepolicy
                                   SET isconfigured=true
                                    WHERE id=@id";

                return await Connection.ExecuteAsync(sql, new { id });
        }
    }
}
