using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IAssetMyAssetService : IAsyncService<AssetMyAsset>
{
    Task<int> InsertAsync(IEnumerable<AssetMyAsset> assetmyasset);

    Task<IEnumerable<AssetMyAsset>> GetAllMyAssetList();

    Task<IEnumerable<AssetAllocated>> GetMyAssetById(int empid);

    // Task<int> UpdateStatus(int assetid, int status);

    Task<int> Update(AssetMyAsset assetmyasset);

}
