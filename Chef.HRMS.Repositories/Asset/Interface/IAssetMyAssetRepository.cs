namespace Chef.HRMS.Repositories;

public interface IAssetMyAssetRepository : IGenericRepository<AssetMyAsset>
{
    Task<int> InsertAsync(IEnumerable<AssetMyAsset> assetmyasset);

    Task<IEnumerable<AssetMyAsset>> GetAllMyAssetList();

    Task<IEnumerable<AssetAllocated>> GetMyAssetById(int empid);
    // Task<int> UpdateStatus(AssetMyAsset assetmyasset);
    Task<int> Update(AssetMyAsset assetmyasset);
}
