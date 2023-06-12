using Chef.Common.Core.Extensions;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
	public class LeaveComponentLopDetailsRepository:GenericRepository<LeaveComponentLopDetails>, ILeaveComponentLopDetailsRepository
	{
		public LeaveComponentLopDetailsRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
		{
		}

		public async Task<IEnumerable<LeaveComponentLopDetails>> GetDetailsByLeaveComponentId(int leaveComponentId)
		{
			string sql = @"SELECT lop.*,pc.name AS payrollcomponentname
						FROM hrms.leavecomponentlopdetails lop
						INNER JOIN hrms.payrollcomponent pc ON pc.id = lop.payrollcomponentid
						WHERE lop.leavecomponentid=@leaveComponentId AND pc.isarchived = false AND lop.isarchived=false ";
            return await Connection.QueryAsync<LeaveComponentLopDetails>(sql, new { leaveComponentId });

        }

		public async Task<int> DeleteByLeaveComponentId(int leaveComponentId)
		{
            return await QueryFactory
            .Query<LeaveComponentLopDetails>()
            .Where("leavecomponentid", leaveComponentId)
            .DeleteAsync();
        }
	}
}
