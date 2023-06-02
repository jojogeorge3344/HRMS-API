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
	}
}
