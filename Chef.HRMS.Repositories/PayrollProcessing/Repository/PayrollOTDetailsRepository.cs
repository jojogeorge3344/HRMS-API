using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
	public class PayrollOTDetailsRepository : GenericRepository<PayrollOTDetails>, IPayrollOTDetailsRepository
	{
		public PayrollOTDetailsRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
		{
		}

		

		public Task<int> BulkUpdateAsync(List<PayrollOTDetails> objs)
		{
			throw new NotImplementedException();
		}

		

		

		public Task<int> UpdateAsync(PayrollOTDetails obj)
		{
			throw new NotImplementedException();
		}

		Task<IEnumerable<PayrollOTDetails>> IGenericRepository<PayrollOTDetails>.GetAllAsync()
		{
			throw new NotImplementedException();
		}

		Task<PayrollOTDetails> IGenericRepository<PayrollOTDetails>.GetAsync(int id)
		{
			throw new NotImplementedException();
		}
	}
}
