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
		private readonly IPayrollComponentDetailsService payrollComponentDetailsService;
		private readonly IPayrollComponentDetailsRepository payrollComponentDetailsRepository;

		public PayrollLoanDetailsService(IPayrollLoanDetailsRepository payrollLoanDetailsRepository,
			IPayrollComponentDetailsService payrollComponentDetailsService,
			IPayrollComponentDetailsRepository payrollComponentDetailsRepository)
		{
			this.payrollLoanDetailsRepository = payrollLoanDetailsRepository;
			this.payrollComponentDetailsService = payrollComponentDetailsService;
			this.payrollComponentDetailsRepository = payrollComponentDetailsRepository;
		}
		public async Task<int> BulkInsertAsync(List<PayrollLoanDetails> payrollLoanDetails)
		{
			var res = payrollLoanDetails.Where(x=>x.PayrollProcessId>0).FirstOrDefault();
			int PayrollProcessID = res.PayrollProcessId;
			int intRet = await DeleteByPayrollProcessID(PayrollProcessID);
			//intRet =await payrollComponentDetailsService.DeleteByPayrollProcessID(PayrollProcessID,2);
			await payrollLoanDetailsRepository.BulkInsertAsync(payrollLoanDetails);
			List<PayrollComponentDetails> payrollComponent = payrollLoanDetails.Select(x => new PayrollComponentDetails()
			{
                PayrollProcessId = x.PayrollProcessId,
                PayrollProcessDate = x.PayrollProcessDate,
				ProcessStatus = x.ProcessStatus,
				CrAccount = 0,
				DrAccount = 0,
				DeductionAmt = x.LoanAmount,
				DocNum = "",
				EarningsAmt = 0,
				EmployeeId = x.EmployeeId,
				PayrollComponentId = x.ComponentId,
				CreatedBy = x.CreatedBy,
				ModifiedBy = x.ModifiedBy,
				CreatedDate = x.CreatedDate,
				ModifiedDate = x.ModifiedDate,
				IsArchived = x.IsArchived,
				StepNo = 2,
		}).ToList();
			await payrollComponentDetailsRepository.BulkInsertAsync(payrollComponent);
			return 1;
		}

		
		public async Task<int> DeleteByPayrollProcessID(int PayrollProcessID)
		{
			return await payrollLoanDetailsRepository.DeleteByPayrollProcessID(PayrollProcessID);
		}

	}
}
