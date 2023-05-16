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
        private readonly IPayrollComponentDetailsRepository payrollComponentDetailsRepository;

        public PayrollLeaveDetailsService(IPayrollLeaveDetailsRepository payrollLeaveDetailsRepository, IPayrollComponentDetailsRepository payrollComponentDetailsRepository)
        {
            this.payrollLeaveDetailsRepository = payrollLeaveDetailsRepository;
            this.payrollComponentDetailsRepository = payrollComponentDetailsRepository;
        }

        public async Task<int> BulkInsertAsync(List<PayrollLeaveDetails> payrollLeaveDetails)
        {
            var res = payrollLeaveDetails.Where(x => x.PayrollProcessId > 0).FirstOrDefault();
            int payrollProcessID = res.PayrollProcessId;
            int intRet = await DeleteByPayrollProcessID(payrollProcessID);
            intRet = await payrollComponentDetailsRepository.DeleteByPayrollProcessID(payrollProcessID, 1);

            await payrollLeaveDetailsRepository.BulkInsertAsync(payrollLeaveDetails);
            List<PayrollComponentDetails> payrollComponent = payrollLeaveDetails.Select(x => new PayrollComponentDetails()
            {
                PayrollProcessId = x.PayrollProcessId,
                PayrollProcessDate = x.PayrollProcessDate,
                ProcessStatus = x.ProcessStatus,
                CrAccount = "",
                DrAccount = "",
                DeductionAmt = 0,
                DocNum = "",
                EarningsAmt = 0,
                EmployeeId = x.EmployeeId,
                PayrollComponentId = 0,
                CreatedBy = x.CreatedBy,
                ModifiedBy = x.ModifiedBy,
                CreatedDate = x.CreatedDate,
                ModifiedDate = x.ModifiedDate,
                IsArchived = x.IsArchived,
                StepNo = 1,
                EmployeeName = "",
            }).ToList();
                await payrollComponentDetailsRepository.BulkInsertAsync(payrollComponent);

                return 1;
            }

        public async Task<int> DeleteByPayrollProcessID(int PayrollProcessID)
        {
            return await payrollLeaveDetailsRepository.DeleteByPayrollProcessID(PayrollProcessID);
        }
    }
}
