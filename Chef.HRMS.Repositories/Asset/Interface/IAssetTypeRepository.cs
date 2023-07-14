namespace Chef.HRMS.Repositories;

public interface IAssetTypeRepository : IGenericRepository<AssetType>
{
    Task<int> InsertAsync(IEnumerable<AssetType> assetType);

    Task<IEnumerable<AssetType>> GetAllAssetTypeList();

    Task<IEnumerable<AssetType>> Get(int AssetId);
}
