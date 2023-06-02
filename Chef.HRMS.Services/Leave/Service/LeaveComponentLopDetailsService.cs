using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
	public class LeaveComponentLopDetailsService : AsyncService<LeaveComponentLopDetails>, ILeaveComponentLopDetailsService
	{
		private readonly ILeaveComponentLopDetailsRepository leaveComponentLopDetails;

		public LeaveComponentLopDetailsService(ILeaveComponentLopDetailsRepository leaveComponentLopDetails)
		{
			this.leaveComponentLopDetails = leaveComponentLopDetails;
		}

		public Task<int> InsertAsync(ILeaveComponentLopDetailsService obj)
		{
			throw new NotImplementedException();
		}

		public Task<int> UpdateAsync(ILeaveComponentLopDetailsService obj)
		{
			throw new NotImplementedException();
		}

		Task<IEnumerable<ILeaveComponentLopDetailsService>> IAsyncService<ILeaveComponentLopDetailsService>.GetAllAsync()
		{
			throw new NotImplementedException();
		}

		Task<ILeaveComponentLopDetailsService> IAsyncService<ILeaveComponentLopDetailsService>.GetAsync(int id)
		{
			throw new NotImplementedException();
		}
	}
}
