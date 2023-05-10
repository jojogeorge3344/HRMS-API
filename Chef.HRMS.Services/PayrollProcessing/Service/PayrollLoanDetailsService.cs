using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;
using Chef.Common.Repositories;
namespace Chef.HRMS.Services
{
	public class PayrollLoanDetailsService : AsyncService<PayrollLoanDetails>, IPayrollLoanDetailsService
	{
		private readonly IPayrollLoanDetailsRepository payrollLoanDetailsRepository;
		public PayrollLoanDetailsService(IPayrollLoanDetailsRepository payrollLoanDetailsRepository)
		{
			this.payrollLoanDetailsRepository = payrollLoanDetailsRepository;
		}
		public async Task<int> BulkInsertAsync(List<PayrollLoanDetails> payrollLoanDetails)
		{
			var res = payrollLoanDetails.Where(x=>x.PayrollProcessId>0).FirstOrDefault();
			int PayrollProcessID = res.PayrollProcessId;
			int intRet = await DeleteByPayrollProcessID(PayrollProcessID);
			foreach (PayrollLoanDetails list in payrollLoanDetails)
			{
				await payrollLoanDetailsRepository.InsertAsync(list);
			}
			return 1;
		}

		
		public async Task<int> DeleteByPayrollProcessID(int PayrollProcessID)
		{
			return await payrollLoanDetailsRepository.DeleteByPayrollProcessID(PayrollProcessID);
		}

	}
}
