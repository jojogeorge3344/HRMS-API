using Chef.HRMS.Models;
using System;

namespace Chef.HRMS.Services;

public interface IFinalSettlemetService : IAsyncService<FinalSettlement>
{
    Task<PreviousPayrollProcessDateView> IsPreviousPayrollProcessed(int PreviousMonth, int previousYear, int employeeId);
    Task<FianlSettlementLeaveBalanceView> GetAllFinalLeaveBalance(DateTime CutOffDateFrom, DateTime CutOffDateTo, int employeeId);
    Task<IEnumerable<FinalSettlementComponetsView>> GetPayrollComponents(DateTime CutOffDateFrom, DateTime CutOffDateTo, int employeeId);
    Task<int> FinalSettlementInsert(FinalSettlement finalSettlement);
    Task<int> FinalSettlementUpdate(FinalSettlement finalSettlement);
    Task<int> FinalSettlementDelete(int id);
    Task<int> UpadteFinalSettlementStatus(int id, int approveStatus);
    Task<FinalSettlementProcessView> FinalSettlementProcess(FinalSettlement finalSettlement);
    Task<FinalSettlement> GetFinalSettlementById(int id);
    Task<IEnumerable<FinalSettlement>> GetFinalaSettlementList();
}
