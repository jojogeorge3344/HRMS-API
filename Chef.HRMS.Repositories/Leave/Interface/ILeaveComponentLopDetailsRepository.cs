using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
	public interface ILeaveComponentLopDetailsRepository:IGenericRepository<LeaveComponentLopDetails>
	{
        Task<IEnumerable<LeaveComponentLopDetails>> GetDetailsByLeaveComponentId(int leaveComponentId);
        Task<int> DeleteByLeaveComponentId(int leaveComponentId);
    }
}
