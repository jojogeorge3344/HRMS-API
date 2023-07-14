namespace Chef.HRMS.Repositories;

public interface IAssetRepository : IGenericRepository<Asset>
{
    Task<IEnumerable<Asset>> GetAllAssetList();
    //Task<IEnumerable<Asset>> GetAssetById(int id);
    Task<IEnumerable<AssetMetadataValue>> GetMetadataValueAsync(int id);
    Task<int> BulkInsertAsync(List<AssetMetadataValue> assetMetadataValues);
    Task<int> BulkUpdateAsync(List<AssetMetadataValue> assetMetadataValues);
    //Task<int> Update(int id);
    Task<IEnumerable<AssetMetadataValue>> GetAllMetadataValue();
    Task<int> UpdateStatus(int id, int status);
}
