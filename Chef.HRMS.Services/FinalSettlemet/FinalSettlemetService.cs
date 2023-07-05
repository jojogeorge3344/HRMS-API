using Chef.Common.Exceptions;
using Chef.Common.Models;
using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using Chef.HRMS.Repositories.FinalSettlement;
using Chef.HRMS.Repositories.Payroll;
using System;
using System.Linq;

namespace Chef.HRMS.Services
{
    public class FinalSettlemetService : AsyncService<FinalSettlement>, IFinalSettlemetService
    {
        private readonly IFinalSettlementRepository finalSettlementRepository;
        private readonly IPayrollProcessingMethodRepository payrollProcessingMethodRepository;
        private readonly ILeaveEligibilityRepository leaveEligibility;
        private readonly ITenantSimpleUnitOfWork tenantSimpleUnitOfWork;
        private readonly IFinalSettlementDetailsRepository finalSettlementDetailsRepository;

        public FinalSettlemetService(IFinalSettlementRepository finalSettlementRepository,
            IPayrollProcessingMethodRepository payrollProcessingMethodRepository,
            ILeaveEligibilityRepository leaveEligibility,
            ITenantSimpleUnitOfWork tenantSimpleUnitOfWork,
            IFinalSettlementDetailsRepository finalSettlementDetailsRepository)
        {
            this.finalSettlementRepository = finalSettlementRepository;
            this.payrollProcessingMethodRepository = payrollProcessingMethodRepository;
            this.leaveEligibility = leaveEligibility;
            this.tenantSimpleUnitOfWork = tenantSimpleUnitOfWork;
            this.finalSettlementDetailsRepository = finalSettlementDetailsRepository;
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
                            final.lOPCalculationView = item;
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
                            finalSettlement.overTimePayrollViewModel = otComponent;
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
                await finalSettlementRepository.UpdateAsync(finalSettlement);

                if (finalSettlement.settlementDetails != null)
                {
                    finalSettlement.settlementDetails.ForEach(x => x.FinalSettlementId = finalSettlementId);
                    await finalSettlementDetailsRepository.BulkInsertAsync(finalSettlement.settlementDetails);
                }
                tenantSimpleUnitOfWork.Commit();
                return finalSettlementId;
            }

            catch (Exception ex)
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

                if (finalSettlement.settlementDetails != null)
                {
                    finalSettlement.settlementDetails.ForEach(x => x.FinalSettlementId = finalSettlement.Id);
                    await finalSettlementDetailsRepository.BulkInsertAsync(finalSettlement.settlementDetails);
                }
                tenantSimpleUnitOfWork.Commit();
                return finalSettlementId;
            }
            catch (Exception ex)
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
                    var finalSettlementDetails = await finalSettlementDetailsRepository.GetFinalSettlementDetailsByFinalSettlementId(id);

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
    }
}
