using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IAssetTypeMetadataService : IAsyncService<AssetTypeMetadata>
{
    Task<int> InsertAsync(IEnumerable<AssetTypeMetadata> assetTypeMetadata);
    Task<int> UpdateAsync(IEnumerable<AssetTypeMetadata> assetTypeMetadata);
    Task<IEnumerable<AssetTypeMetadata>> GetAllAssetTypeMetadataList();
    Task<IEnumerable<AssetTypeMetadata>> GetAssetTypeId(int Id);
    Task<int> DeleteAsync(int assetTypeId);

    Task<int> DeleteMetadata(int id);

}
