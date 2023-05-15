using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
	public class PayrollOTSummaryService : AsyncService<PayrollOTSummary>, IPayrollOTSummaryService
	{
		private readonly IPayrollOTSummaryRepository payrollOTSummaryRepository;
		private readonly IPayrollOTDetailsRepository payrollOTDetailsRepository;
		private readonly IPayrollComponentDetailsService payrollComponentDetailsService;
		private readonly IPayrollOTDetailsService payrollOTDetailsService;
		private readonly IPayrollComponentDetailsRepository payrollComponentDetailsRepository;

		public PayrollOTSummaryService(IPayrollOTSummaryRepository payrollOTSummaryRepository,
			IPayrollOTDetailsRepository payrollOTDetailsRepository,
			IPayrollComponentDetailsService payrollComponentDetailsService,
			IPayrollOTDetailsService payrollOTDetailsService,
			IPayrollComponentDetailsRepository payrollComponentDetailsRepository)
		{
			this.payrollOTSummaryRepository = payrollOTSummaryRepository;
			this.payrollOTDetailsRepository = payrollOTDetailsRepository;
			this.payrollComponentDetailsService = payrollComponentDetailsService;
			this.payrollOTDetailsService = payrollOTDetailsService;
			this.payrollComponentDetailsRepository = payrollComponentDetailsRepository;
		}
		public async Task<int> BulkInsertAsync(List<PayrollOTSummary> payrollOTSummary)
		{
			var res = payrollOTSummary.Where(x => x.PayrollProcessId > 0).FirstOrDefault();
			int PayrollProcessID = res.PayrollProcessId;
			int intRet = await DeleteByPayrollProcessID(PayrollProcessID);
			intRet = await payrollComponentDetailsService.DeleteByPayrollProcessID(PayrollProcessID, 2);
			
			foreach (PayrollOTSummary oTSummary in payrollOTSummary)
			{
				int payrollOTSummaryid = await payrollOTSummaryRepository.InsertAsync(oTSummary);
				oTSummary.PayrollOTDetails.ForEach(x => x.PayrollOTSummaryid = payrollOTSummaryid);
				await payrollOTDetailsRepository.BulkInsertAsync(oTSummary.PayrollOTDetails);
				List<PayrollComponentDetails> payrollComponent = oTSummary.PayrollOTDetails.Select(x => new PayrollComponentDetails()
				{
					PayrollProcessId = oTSummary.PayrollProcessId,
					PayrollProcessDate = oTSummary.PayrollProcessDate,
					ProcessStatus = oTSummary.ProcessStatus,
					CrAccount = "",
					DrAccount = "",
					DeductionAmt = 0,
					DocNum = "",
					EarningsAmt = x.NotHrsAmount+x.SotHrsAmount+x.HotHrsAmount,
					EmployeeId = x.EmployeeId,
					PayrollComponentId = 0,
					CreatedBy = x.CreatedBy,
					ModifiedBy = x.ModifiedBy,
					CreatedDate = x.CreatedDate,
					ModifiedDate = x.ModifiedDate,
					IsArchived = x.IsArchived,
					StepNo = 2,
				}).ToList();
				await payrollComponentDetailsRepository.BulkInsertAsync(payrollComponent);
			}

			return 1;
		}


		public async Task<int> DeleteByPayrollProcessID(int PayrollProcessID)
		{
			return await payrollOTSummaryRepository.DeleteByPayrollProcessID(PayrollProcessID);
		}
	}
}
