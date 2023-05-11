using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class PayrollLeaveDetailsService : AsyncService<PayrollLeaveDetails>, IPayrollLeaveDetailsService
    {
        private readonly IPayrollLeaveDetailsRepository payrollLeaveDetailsRepository;

        public PayrollLeaveDetailsService(IPayrollLeaveDetailsRepository payrollLeaveDetailsRepository)
        {
            this.payrollLeaveDetailsRepository = payrollLeaveDetailsRepository;
        }

        public async Task<int> BulkInsertAsync(List<PayrollLeaveDetails> payrollLeaveDetails)
        {
            var res = payrollLeaveDetails.Where(x => x.PayrollProcessId > 0).FirstOrDefault();
            int payrollProcessID = res.PayrollProcessId;
            int intRet = await DeleteByPayrollProcessID(payrollProcessID);
            intRet = await payrollComponentDetailsService.DeleteByPayrollProcessID(payrollProcessID, 1);

            await payrollLeaveDetailsRepository.BulkInsertAsync(payrollLeaveDetails);
            List<PayrollComponentDetails> payrollComponent = payrollLeaveDetails.Select(x => new PayrollComponentDetails()
            {
                PayrollProcessid = x.PayrollProcessId,
                PayrollProcessdate = x.PayrollProcessDate,
                ProcessStatus = x.ProcessStatus,
                CrAccount = "",
                DrAccount = "",
                DeductionAmt = "",
                DocNum = "",
                EarningsAmt = "",
                Employeeid = x.EmployeeId,
                PayrollComponentid = 0,
                CreatedBy = x.CreatedBy,
                ModifiedBy = x.ModifiedBy,
                CreatedDate = x.CreatedDate,
                ModifiedDate = x.ModifiedDate,
                IsArchived = x.IsArchived,
                StepNo = 1,
            }).Tolist();
                await payrollComponentDetailsService.BulkInsertAsync(payrollComponent);
                return 1;
            }

        public async Task<int> DeleteByPayrollProcessID(int PayrollProcessID)
        {
            return await payrollLeaveDetailsRepository.DeleteByPayrollProcessID(PayrollProcessID);
        }
    }
}
