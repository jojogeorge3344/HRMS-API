namespace Chef.HRMS.Repositories.FinalSettlement
{
    public class FinalSettlementRepository : TenantRepository<Chef.HRMS.Models.FinalSettlement>, IFinalSettlementRepository
    {
        public FinalSettlementRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {

        }
    }
}
