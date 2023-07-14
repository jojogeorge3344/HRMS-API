using Chef.HRMS.Models.Slab;

namespace Chef.HRMS.Repositories;

public class SlabRepository : TenantRepository<Slab>, ISlabRepository
{
    public SlabRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {

    }

    public async Task<Slab> GetSlabByEOS(int eosId, int duration)
    {
        var sql = @"select lowerlimit, upperlimit, eosid, bfcode, bfname
                        from hrms.slab 
                        where eosid = @eosId and (@duration between lowerlimit and upperlimit) limit 1";
        return await Connection.QueryFirstOrDefaultAsync<Slab>(sql, new { eosId, duration });
    }
}
