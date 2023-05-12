using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
	public class LeaveDetailsRepository : GenericRepository<LeaveDetails>, ILeaveDetailsRepository
	{
		public LeaveDetailsRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
		{
		}
	}
}
