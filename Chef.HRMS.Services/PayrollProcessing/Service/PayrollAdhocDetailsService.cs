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
		private readonly IPayrollComponentDetailsService payrollComponentDetailsService;

		public PayrollAdhocDetailsService(IPayrollAdhocDetailsRepository payrollAdhocDetailsRepository,
			IPayrollComponentDetailsService payrollComponentDetailsService)
		{
			this.payrollAdhocDetailsRepository = payrollAdhocDetailsRepository;
			this.payrollComponentDetailsService = payrollComponentDetailsService;
		}
		public async Task<int> BulkInsertAsync(List<PayrollAdhocDetails> payrollAdhocDetails)
		{
			var res = payrollAdhocDetails.Where(x => x.PayrollProcessId > 0).FirstOrDefault();
			int payrollProcessID = res.PayrollProcessId;
			int intRet = await DeleteByPayrollProcessID(payrollProcessID);
			intRet = await payrollComponentDetailsService.DeleteByPayrollProcessID(payrollProcessID,2);
			foreach (PayrollAdhocDetails list in payrollAdhocDetails)
			{
				await payrollAdhocDetailsRepository.InsertAsync(list);
				PayrollComponentDetails payrollComponent = new PayrollComponentDetails();
				payrollComponent.PayrollProcessId = list.PayrollProcessId;
				payrollComponent.PayrollProcessedDate = list.PayrollProcessDate;
				payrollComponent.ProcessStatus = list.ProcessStatus;
				payrollComponent.CrAccount = "";
				payrollComponent.DrAccount = "";
				payrollComponent.DeductionAmt = list.IsAddition==true?0: list.AdhocAmount;
				payrollComponent.DocNum = "";
				payrollComponent.EarningsAmt = list.IsAddition == false ? 0 : list.AdhocAmount;
				payrollComponent.EmployeeId = list.EmployeeId;
				payrollComponent.PayrollComponentId = 0;
				payrollComponent.CreatedBy = list.CreatedBy;
				payrollComponent.ModifiedBy = list.ModifiedBy;
				payrollComponent.CreatedDate = list.CreatedDate;
				payrollComponent.ModifiedDate = list.ModifiedDate;
				payrollComponent.IsArchived = list.IsArchived;
				payrollComponent.StepNo = 2;
				await payrollComponentDetailsService.InsertAsync(payrollComponent);
			}
			return 1;
		}
		public async Task<int> DeleteByPayrollProcessID(int PayrollProcessID)
		{	
				return await payrollAdhocDetailsRepository.DeleteByPayrollProcessID(PayrollProcessID);
		}

	}
}
