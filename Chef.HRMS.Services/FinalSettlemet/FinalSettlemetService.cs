using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using Chef.HRMS.Repositories.FinalSettlement;
using System;
using System.Linq;

namespace Chef.HRMS.Services;

public class FinalSettlemetService : AsyncService<FinalSettlement>, IFinalSettlemetService
{
    private readonly IFinalSettlementRepository finalSettlementRepository;
    private readonly IPayrollProcessingMethodRepository payrollProcessingMethodRepository;
    private readonly ILeaveEligibilityRepository leaveEligibility;
    private readonly ITenantSimpleUnitOfWork tenantSimpleUnitOfWork;
    private readonly IFinalSettlementDetailsRepository finalSettlementDetailsRepository;
    private readonly IPayrollComponentDetailsRepository payrollComponentDetailsRepository;

    public FinalSettlemetService(IFinalSettlementRepository finalSettlementRepository,
        IPayrollProcessingMethodRepository payrollProcessingMethodRepository,
        ILeaveEligibilityRepository leaveEligibility,
        ITenantSimpleUnitOfWork tenantSimpleUnitOfWork,
        IFinalSettlementDetailsRepository finalSettlementDetailsRepository,
        IPayrollComponentDetailsRepository payrollComponentDetailsRepository)
    {
        this.finalSettlementRepository = finalSettlementRepository;
        this.payrollProcessingMethodRepository = payrollProcessingMethodRepository;
        this.leaveEligibility = leaveEligibility;
        this.tenantSimpleUnitOfWork = tenantSimpleUnitOfWork;
        this.finalSettlementDetailsRepository = finalSettlementDetailsRepository;
        this.payrollComponentDetailsRepository = payrollComponentDetailsRepository;
    }
    public async Task<PreviousPayrollProcessDateView> IsPreviousPayrollProcessed(int PreviousMonth, int previousYear, int employeeId)
    {
        PreviousPayrollProcessDateView processDateView = new PreviousPayrollProcessDateView();
        bool isProcessed = await payrollProcessingMethodRepository.IsPreviousPayrollProcessed(PreviousMonth, previousYear, employeeId);

        if (isProcessed != false)
        {
            processDateView.IsProcessed = isProcessed;
            var previousProcessDate = await finalSettlementRepository.GetPreviousProcessDate(employeeId);
            processDateView.PreviousPayrollProcessDate = previousProcessDate;
        }
        else
        {
            throw new Exception("Previous month Payroll not processed");
        }
        return processDateView;
    }
    public async Task<FianlSettlementLeaveBalanceView> GetAllFinalLeaveBalance(DateTime CutOffDateFrom, DateTime CutOffDateTo, int employeeId)
    {
        FianlSettlementLeaveBalanceView leaveBalanceView = new FianlSettlementLeaveBalanceView();
        var annualLeave = await finalSettlementRepository.GetFinalLeaveBalance(CutOffDateFrom, CutOffDateTo, employeeId);
        leaveBalanceView.AnnualLeaveBalance = annualLeave;
        var eos = await finalSettlementRepository.GetEOSBalanceDays(CutOffDateFrom, CutOffDateTo, employeeId);
        leaveBalanceView.EOSBalanceDays = eos;
        var ticket = await finalSettlementRepository.GetFinalTicketAmountBalance(CutOffDateFrom, CutOffDateTo, employeeId);
        leaveBalanceView.AccruedTicketAmt = ticket;

        return leaveBalanceView;
    }
    public async Task<IEnumerable<FinalSettlementComponetsView>> GetPayrollComponents(DateTime CutOffDateFrom, DateTime CutOffDateTo, int employeeId)
    {
        try
        {
            List<FinalSettlementComponetsView> finalSettlementComponetsViews = new List<FinalSettlementComponetsView>();

            var payrollComponents = await finalSettlementRepository.GetPayrollComponents(employeeId);
            finalSettlementComponetsViews = payrollComponents.ToList();
            var leaveComponents = await finalSettlementRepository.GetLeaveComponents(CutOffDateFrom, CutOffDateTo, employeeId);
            foreach (LOPCalculationView item in leaveComponents)
            {
                foreach (FinalSettlementComponetsView final in finalSettlementComponetsViews)
                {
                    if (final.PayrollComponentId == item.PayrollComponentId)
                    {
                        final.LOPCalculationView = item;
                    }
                }
            }
            var overTimeComponents = await finalSettlementRepository.GetOverTimeComponents(CutOffDateFrom, CutOffDateTo, employeeId);
            foreach (OverTimePayrollViewModel otComponent in overTimeComponents)
            {
                foreach (FinalSettlementComponetsView finalSettlement in finalSettlementComponetsViews)
                {
                    if (finalSettlement.PayrollComponentId == otComponent.ComponentId)
                    {
                        finalSettlement.OverTimePayrollViewModel = otComponent;
                    }
                }
            }

            return finalSettlementComponetsViews;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<int> FinalSettlementInsert(FinalSettlement finalSettlement)
    {
        tenantSimpleUnitOfWork.BeginTransaction();
        try
        {
            int finalSettlementId = await finalSettlementRepository.InsertAsync(finalSettlement);
            finalSettlement.RequestNum = "REQ-" + finalSettlementId;
            var up = await finalSettlementRepository.UpdateAsync(finalSettlement);

            if (finalSettlement.SettlementDetails != null)
            {
                finalSettlement.SettlementDetails.ForEach(x => x.FinalSettlementId = finalSettlementId);
                await finalSettlementDetailsRepository.BulkInsertAsync(finalSettlement.SettlementDetails);
            }
            tenantSimpleUnitOfWork.Commit();
            return finalSettlementId;
        }
        catch
        {
            tenantSimpleUnitOfWork.Rollback();
            return 0;
        }
    }

    public async Task<int> FinalSettlementUpdate(FinalSettlement finalSettlement)
    {
        tenantSimpleUnitOfWork.BeginTransaction();
        try
        {
            int finalSettlementId = await finalSettlementRepository.UpdateAsync(finalSettlement);

            await finalSettlementDetailsRepository.DeleteByFinalSettlementId(finalSettlement.Id);

            if (finalSettlement.SettlementDetails != null)
            {
                finalSettlement.SettlementDetails.ForEach(x => x.FinalSettlementId = finalSettlement.Id);
                await finalSettlementDetailsRepository.BulkInsertAsync(finalSettlement.SettlementDetails);
            }
            tenantSimpleUnitOfWork.Commit();
            return finalSettlementId;
        }
        catch
        {
            tenantSimpleUnitOfWork.Rollback();
            return 0;
        }
    }

    public async Task<int> FinalSettlementDelete(int id)
    {
        tenantSimpleUnitOfWork.BeginTransaction();
        try
        {
            var finalSettlement = await finalSettlementRepository.GetAsync(id);

            if (finalSettlement != null)
            {
                int finalSettlementDelete = await finalSettlementRepository.DeleteAsync(id);
                var finalSettlementDetails = await finalSettlementDetailsRepository.GetByFinalSettlementId(id);

                foreach (FinalSettlementDetails settlementDetails in finalSettlementDetails)
                {
                    await finalSettlementDetailsRepository.DeleteAsync(settlementDetails.Id);
                }
            }
            tenantSimpleUnitOfWork.Commit();
            return 1;
        }
        catch (Exception ex)
        {
            tenantSimpleUnitOfWork.Rollback();
            return 0;
        }
    }

    public async Task<int> UpadteFinalSettlementStatus(int id, int approveStatus)
    {
        return await finalSettlementRepository.UpadteFinalSettlementStatus(id, approveStatus);
    }

    public async Task<FinalSettlementProcessView> FinalSettlementProcess(FinalSettlement finalSettlement)
    {
        tenantSimpleUnitOfWork.BeginTransaction();
        FinalSettlementProcessView settlementProcessView = new FinalSettlementProcessView();
        try
        {
            if (finalSettlement != null)
            {
                bool isAssetReturned = await finalSettlementRepository.IsAssetPending(finalSettlement.EmployeeId);
                if (isAssetReturned != true)
                {
                    List<PayrollComponentDetails> payrollComponent = finalSettlement.SettlementDetails.Select(x => new PayrollComponentDetails()
                    {
                        PayrollProcessId = 0,
                        PayrollProcessDate = finalSettlement.ProcessDate,
                        ProcessStatus = (int)finalSettlement.ProcessStatus,
                        CrAccount = 0,
                        DrAccount = 0,
                        DeductionAmt = x.DeductionAmt,
                        DocNum = "",
                        EarningsAmt = x.EarningsAmt,
                        EmployeeId = finalSettlement.EmployeeId,
                        PayrollComponentId = x.PayrollComponentId,
                        CreatedBy = x.CreatedBy,
                        ModifiedBy = x.ModifiedBy,
                        CreatedDate = x.CreatedDate,
                        ModifiedDate = x.ModifiedDate,
                        IsArchived = x.IsArchived,
                        StepNo = 0,
                        FinalSettlementId = x.FinalSettlementId
                    }).ToList();
                    await payrollComponentDetailsRepository.BulkInsertAsync(payrollComponent);
                }
                else
                {
                    var assetList = await finalSettlementRepository.GetPendingAssetList(finalSettlement.EmployeeId);
                    settlementProcessView.PendingAssets = assetList.ToList();
                    throw new Exception("Asset not returned");
                }
            }
            settlementProcessView.FinalSettlementProcessStatus = ("Success");
            tenantSimpleUnitOfWork.Commit();
            return settlementProcessView;
        }
        catch
        {
            tenantSimpleUnitOfWork.Rollback();
            settlementProcessView.FinalSettlementProcessStatus = ("Faild!");
            return settlementProcessView;
        }
    }

    public async Task<FinalSettlement> GetFinalSettlementById(int id)
    {
        FinalSettlement final = new FinalSettlement();
        var finalSettlement = await finalSettlementRepository.GetAsync(id);
        final = finalSettlement;
        var finalSettlementDetails = await finalSettlementDetailsRepository.GetDetailsByFinalSettlementId(id);
        final.SettlementDetails = finalSettlementDetails.ToList();
        return final;
    }

    public async Task<IEnumerable<FinalSettlement>> GetFinalaSettlementList()
    {
        return await finalSettlementRepository.GetFinalaSettlementList();
    }
}
