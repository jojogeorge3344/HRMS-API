using Chef.Common.Core.Services;
using Chef.HRMS.Models.Slab;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface ISlabRepository : IAsyncService<Slab>
    {
        Task<Slab> GetSlabByEOS(int eosId, int duration);
    }
}
