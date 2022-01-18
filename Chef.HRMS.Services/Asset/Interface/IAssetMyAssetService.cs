using Chef.Common.Services;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IAssetMyAssetService : IAsyncService<AssetMyAsset>
    {
        Task<int> InsertAsync(IEnumerable<AssetMyAsset> assetmyasset);

        Task<IEnumerable<AssetMyAsset>> GetAllMyAssetList();

        Task<IEnumerable<AssetAllocated>> GetMyAssetById(int empid);

        Task<int> UpdateStatus(int assetid, int status);
        //Task<int> Update(int status);
    }
}
