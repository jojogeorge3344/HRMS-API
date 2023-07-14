namespace Chef.HRMS.Repositories;

public interface IFinalSettlementRepository : IGenericRepository<Chef.HRMS.Models.FinalSettlement>
{
    Task<decimal> GetFinalLeaveBalance(DateTime CutOffDateFrom, DateTime CutOffDateTo, int employeeId);
    Task<decimal> GetEOSBalanceDays(DateTime CutOffDateFrom, DateTime CutOffDateTo, int employeeId);
    Task<decimal> GetFinalTicketAmountBalance(DateTime CutOffDateFrom, DateTime CutOffDateTo, int employeeId);
    Task<IEnumerable<FinalSettlementComponetsView>> GetPayrollComponents(int employeeId);
    Task<IEnumerable<LOPCalculationView>> GetLeaveComponents(DateTime CutOffDateFrom, DateTime CutOffDateTo, int employeeId);
    Task<IEnumerable<OverTimePayrollViewModel>> GetOverTimeComponents(DateTime CutOffDateFrom, DateTime CutOffDateTo, int employeeId);
    Task<DateTime> GetPreviousProcessDate(int employeeId);
    Task<int> UpadteFinalSettlementStatus(int id, int approveStatus);
    Task<IEnumerable<Chef.HRMS.Models.FinalSettlement>> GetFinalaSettlementList();
    Task<bool> IsAssetPending(int employeeId);
    Task<IEnumerable<AssetRaiseRequest>> GetPendingAssetList(int employeeId);
}
