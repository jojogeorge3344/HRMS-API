using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
	public class LeaveDetailsService : AsyncService<LeaveDetails>, ILeaveDetailsService
	{
		private ILeaveDetailsRepository leaveDetailsRepository;

		public LeaveDetailsService(ILeaveDetailsRepository leaveDetailsRepository)
		{
			this.leaveDetailsRepository = leaveDetailsRepository;
		}

		public Task<int> InsertAsync(PayrollAdhocDetails obj)
		{
			throw new NotImplementedException();
		}

		public Task<int> UpdateAsync(PayrollAdhocDetails obj)
		{
			throw new NotImplementedException();
		}

		Task<IEnumerable<PayrollAdhocDetails>> IAsyncService<PayrollAdhocDetails>.GetAllAsync()
		{
			throw new NotImplementedException();
		}

		Task<PayrollAdhocDetails> IAsyncService<PayrollAdhocDetails>.GetAsync(int id)
		{
			throw new NotImplementedException();
		}
	}
}
