using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using Chef.Common.Repositories;

namespace Chef.HRMS.Services
{
	public class PayrollAdhocDetailsService : AsyncService<PayrollAdhocDetails>, IPayrollAdhocDetailsService
	{
		private readonly IPayrollAdhocDetailsRepository payrollAdhocDetailsRepository;
		public PayrollAdhocDetailsService(IPayrollAdhocDetailsRepository payrollAdhocDetailsRepository)
		{
			this.payrollAdhocDetailsRepository = payrollAdhocDetailsRepository;
		}
		public async Task<int> BulkInsertAsync(List<PayrollAdhocDetails> payrollAdhocDetails)
		{
			var res = payrollAdhocDetails.Where(x => x.PayrollProcessId > 0).FirstOrDefault();
			int PayrollProcessID = res.PayrollProcessId;
			int intRet = await DeleteByPayrollProcessID(PayrollProcessID);
			foreach (PayrollAdhocDetails list in payrollAdhocDetails)
			{
				await payrollAdhocDetailsRepository.InsertAsync(list);
			}
			return 1;
		}
		public async Task<int> DeleteByPayrollProcessID(int PayrollProcessID)
		{	
				return await payrollAdhocDetailsRepository.DeleteByPayrollProcessID(PayrollProcessID);
		}

	}
}
