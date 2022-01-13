using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IAssetMyAssetRepository : IGenericRepository<AssetMyAsset>
    {
        Task<int> InsertAsync(IEnumerable<AssetMyAsset> assetmyasset);

        Task<IEnumerable<AssetMyAsset>> GetAllMyAssetList();

        Task<IEnumerable<AssetMyAsset>> GetMyAssetById(int id);
        Task<int> UpdateStatus(int assetid, int status);
    }
}
