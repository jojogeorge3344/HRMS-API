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
		public PayrollLoanDetailsService(IPayrollLoanDetailsRepository payrollLoanDetailsRepository,
			IPayrollComponentDetailsService payrollComponentDetailsService)
		{
			this.payrollLoanDetailsRepository = payrollLoanDetailsRepository;
			this.payrollComponentDetailsService = payrollComponentDetailsService;
		}
		public async Task<int> BulkInsertAsync(List<PayrollLoanDetails> payrollLoanDetails)
		{
			var res = payrollLoanDetails.Where(x=>x.PayrollProcessId>0).FirstOrDefault();
			int PayrollProcessID = res.PayrollProcessId;
			int intRet = await DeleteByPayrollProcessID(PayrollProcessID);
			intRet =await payrollComponentDetailsService.DeleteByPayrollProcessID(PayrollProcessID,4);
			foreach (PayrollLoanDetails list in payrollLoanDetails)
			{
				await payrollLoanDetailsRepository.InsertAsync(list);
				PayrollComponentDetails payrollComponent = new PayrollComponentDetails();
				payrollComponent.PayrollProcessid = list.PayrollProcessId;
				payrollComponent.PayrollProcessdate = list.PayrollProcessDate;
				payrollComponent.ProcessStatus = list.ProcessStatus;
				payrollComponent.CrAccount = "";
				payrollComponent.DrAccount = "";
				payrollComponent.DeductionAmt = list.LoanAmount;
				payrollComponent.DocNum = "";
				payrollComponent.EarningsAmt = 0;
				payrollComponent.Employeeid = list.EmployeeId;
				payrollComponent.PayrollComponentid = 0;
				payrollComponent.CreatedBy = list.CreatedBy;
				payrollComponent.ModifiedBy = list.ModifiedBy;
				payrollComponent.CreatedDate = list.CreatedDate;
				payrollComponent.ModifiedDate = list.ModifiedDate;
				payrollComponent.IsArchived = list.IsArchived;
				payrollComponent.StepNo = 4;
				await payrollComponentDetailsService.InsertAsync(payrollComponent);
			}
			return 1;
		}

		
		public async Task<int> DeleteByPayrollProcessID(int PayrollProcessID)
		{
			return await payrollLoanDetailsRepository.DeleteByPayrollProcessID(PayrollProcessID);
		}

	}
}
