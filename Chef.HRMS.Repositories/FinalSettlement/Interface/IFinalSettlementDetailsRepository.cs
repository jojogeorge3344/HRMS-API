namespace Chef.HRMS.Repositories.FinalSettlement;

public interface IFinalSettlementDetailsRepository : IGenericRepository<FinalSettlementDetails>
{
    Task<int> DeleteByFinalSettlementId(int finalSettlementId);
    Task<IEnumerable<FinalSettlementDetails>> GetByFinalSettlementId(int id);
    Task<IEnumerable<FinalSettlementDetails>> GetDetailsByFinalSettlementId(int id);
}
