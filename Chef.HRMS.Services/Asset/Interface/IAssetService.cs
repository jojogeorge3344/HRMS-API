using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IAssetService : IAsyncService<Asset>
{
    Task<int> InsertAsync(Asset asset);


    Task<IEnumerable<Asset>> GetAllAssetList();
    Task<Asset> GetAssetById(int Id);

    Task<IEnumerable<AssetMetadataValue>> GetAllMetadataValue();

    Task<int> UpdateStatus(int id, int status);
}
