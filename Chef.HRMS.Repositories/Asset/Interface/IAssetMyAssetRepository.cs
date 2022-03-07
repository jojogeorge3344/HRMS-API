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

        Task<IEnumerable<AssetAllocated>> GetMyAssetById(int empid);
       // Task<int> UpdateStatus(AssetMyAsset assetmyasset);
        Task<int> Update(AssetMyAsset assetmyasset);
        Task<int> InsertRequest(AssetRaiseRequest assetRaiseRequest);
    }
}
