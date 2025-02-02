﻿using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Linq;

namespace Chef.HRMS.Services;

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
        int payrollLeaveInsert = 0;
        if (payrollLeaveDetails.Count != 0)
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
                CrAccount = 0,
                DrAccount = 0,
                DeductionAmt = 0,
                DocNum = "",
                EarningsAmt = 0,
                EmployeeId = x.EmployeeId,
                PayrollComponentId = x.LeaveComponentId,
                CreatedBy = x.CreatedBy,
                ModifiedBy = x.ModifiedBy,
                CreatedDate = x.CreatedDate,
                ModifiedDate = x.ModifiedDate,
                IsArchived = x.IsArchived,
                StepNo = 1,
                EmployeeName = "",
            }).ToList();
            payrollLeaveInsert = await payrollComponentDetailsRepository.BulkInsertAsync(payrollComponent);

            return payrollLeaveInsert;
        }
        return payrollLeaveInsert;
    }

    public async Task<int> DeleteByPayrollProcessID(int PayrollProcessID)
    {
        return await payrollLeaveDetailsRepository.DeleteByPayrollProcessID(PayrollProcessID);
    }


}
