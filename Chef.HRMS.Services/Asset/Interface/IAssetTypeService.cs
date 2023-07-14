using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IAssetTypeService : IAsyncService<AssetType>
{
    Task<int> InsertAsync(IEnumerable<AssetType> assetType);

    Task<IEnumerable<AssetType>> GetAllAssetTypeList();

    Task<IEnumerable<AssetType>> Get(int id);





}
