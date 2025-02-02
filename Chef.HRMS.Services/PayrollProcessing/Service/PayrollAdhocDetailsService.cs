﻿using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Linq;

namespace Chef.HRMS.Services;

public class PayrollAdhocDetailsService : AsyncService<PayrollAdhocDetails>, IPayrollAdhocDetailsService
{
    private readonly IPayrollAdhocDetailsRepository payrollAdhocDetailsRepository;
    private readonly IPayrollComponentDetailsService payrollComponentDetailsService;
    private readonly IPayrollComponentDetailsRepository payrollComponentDetailsRepository;

    public PayrollAdhocDetailsService(IPayrollAdhocDetailsRepository payrollAdhocDetailsRepository,
        IPayrollComponentDetailsService payrollComponentDetailsService,
        IPayrollComponentDetailsRepository payrollComponentDetailsRepository)
    {
        this.payrollAdhocDetailsRepository = payrollAdhocDetailsRepository;
        this.payrollComponentDetailsService = payrollComponentDetailsService;
        this.payrollComponentDetailsRepository = payrollComponentDetailsRepository;
    }
    public async Task<int> BulkInsertAsync(List<PayrollAdhocDetails> payrollAdhocDetails)
    {
        int adhocInsert = 0;

        if (payrollAdhocDetails.Count != 0)
        {
            var res = payrollAdhocDetails.Where(x => x.PayrollProcessId > 0).FirstOrDefault();
            int payrollProcessID = res.PayrollProcessId;
            int intRet = await DeleteByPayrollProcessID(payrollProcessID);
            intRet = await payrollComponentDetailsService.DeleteByPayrollProcessID(payrollProcessID, 2);
            await payrollAdhocDetailsRepository.BulkInsertAsync(payrollAdhocDetails);
            List<PayrollComponentDetails> payrollComponent = payrollAdhocDetails.Select(x => new PayrollComponentDetails()
            {
                PayrollProcessId = x.PayrollProcessId,
                PayrollProcessDate = x.PayrollProcessDate,
                ProcessStatus = x.ProcessStatus,
                CrAccount = 0,
                DrAccount = 0,
                DeductionAmt = x.IsAddition == true ? 0 : x.AdhocAmount,
                DocNum = "",
                EarningsAmt = x.IsAddition == false ? 0 : x.AdhocAmount,
                EmployeeId = x.EmployeeId,
                PayrollComponentId = x.ComponentId,
                CreatedBy = x.CreatedBy,
                ModifiedBy = x.ModifiedBy,
                CreatedDate = x.CreatedDate,
                ModifiedDate = x.ModifiedDate,
                IsArchived = x.IsArchived,
                StepNo = 2,
            }).ToList();
            adhocInsert = await payrollComponentDetailsRepository.BulkInsertAsync(payrollComponent);
            return adhocInsert;
        }
        return adhocInsert;
    }
    public async Task<int> DeleteByPayrollProcessID(int PayrollProcessID)
    {
        return await payrollAdhocDetailsRepository.DeleteByPayrollProcessID(PayrollProcessID);
    }

}
