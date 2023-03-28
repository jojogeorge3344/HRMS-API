using Chef.Common.Core.Extensions;
using Chef.Common.Models;
using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class WPSUserRepository : GenericRepository<WPSUser>, IWPSUserRepository
    {
        public WPSUserRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<WPSUser>> GetAllByemployeeId(int employeeId)
        {
                var sql = "SELECT * FROM  hrms.WPSUser WHERE employeeid = @employeeId  ORDER BY id";

                return await Connection.QueryAsync<WPSUser>(sql, new { employeeId });
        }

        public async Task<IEnumerable<HRMSBank>> GetBank()
        {
            return await QueryFactory
            .Query<HRMSBank>()
            .WhereNotArchived()
            .GetAsync<HRMSBank>();
        }

        //public async Task<int> Update(WPSUser wpsUser)
        //{
        //    var sql = @"update hrms.WPSUser 
        //                set wpsid=@wpsid,groupid=@groupid 
        //                where employeeid=@employeeid";
        //    return await Connection.ExecuteAsync(sql, wpsUser);
        //}
    }
}
