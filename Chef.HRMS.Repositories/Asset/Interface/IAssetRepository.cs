using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IAssetRepository : IGenericRepository<Asset>
    {
        Task<int> InsertAsync(IEnumerable<Asset> asset);

        Task<IEnumerable<Asset>> GetAllAssetList();
        Task<IEnumerable<Asset>> GetAssetById(int Id);
    }
}
