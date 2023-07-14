using Chef.Common.Core.Extensions;

namespace Chef.HRMS.Repositories.FinalSettlement;

public class FinalSettlementDetailsRepository : TenantRepository<FinalSettlementDetails>, IFinalSettlementDetailsRepository
{
    public FinalSettlementDetailsRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {

    }

    public async Task<int> DeleteByFinalSettlementId(int finalSettlementId)
    {
        return await QueryFactory
        .Query<FinalSettlementDetails>()
        .Where("finalsettlementid", finalSettlementId)
        .DeleteAsync();
    }

    public async Task<IEnumerable<FinalSettlementDetails>> GetByFinalSettlementId(int id)
    {
        return await QueryFactory
       .Query<FinalSettlementDetails>()
       .Where("finalsettlementid", id)
       .WhereNotArchived()
       .GetAsync<FinalSettlementDetails>();
    }

    public async Task<IEnumerable<FinalSettlementDetails>> GetDetailsByFinalSettlementId(int id)
    {
        var sql = @"SELECT
                          fsd.*,
                          pc.shortcode AS payrollcomponentcode,
                          pc.name AS payrollcomponentname
                        FROM hrms.finalsettlementdetails fsd
                        INNER JOIN hrms.payrollcomponent pc
                          ON fsd.payrollcomponentid = pc.id
                        WHERE fsd.finalsettlementid = @id
                        AND fsd.isarchived = FALSE";

        return await Connection.QueryAsync<FinalSettlementDetails>(sql, new { id });
    }
}
