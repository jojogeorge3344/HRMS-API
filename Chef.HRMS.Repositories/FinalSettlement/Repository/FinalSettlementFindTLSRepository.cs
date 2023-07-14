namespace Chef.HRMS.Repositories.FinalSettlement;

public class FinalSettlementFindTLSRepository : TenantRepository<FinalSettlementFindTLS>, IFinalSettlementFindTLSRepository
{
    public FinalSettlementFindTLSRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {

    }
}
