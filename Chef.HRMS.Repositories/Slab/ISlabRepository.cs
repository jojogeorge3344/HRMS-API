using Chef.Common.Core.Services;
using Chef.HRMS.Models.Slab;

namespace Chef.HRMS.Repositories;

public interface ISlabRepository : IAsyncService<Slab>
{
    Task<Slab> GetSlabByEOS(int eosId, int duration);
}
