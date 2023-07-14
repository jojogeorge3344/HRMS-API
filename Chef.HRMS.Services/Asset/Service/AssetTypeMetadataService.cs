using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Linq;

namespace Chef.HRMS.Services;

public class AssetTypeMetadataService : IAsyncService<AssetTypeMetadata>, IAssetTypeMetadataService
{
    private readonly IAssetTypeMetadataRepository assetTypeMetadataRepository;
    private readonly ITenantSimpleUnitOfWork simpleUnitOfWork;
    public AssetTypeMetadataService(IAssetTypeMetadataRepository assetTypeMetadataRepository, ITenantSimpleUnitOfWork TenantSimpleUnitOfWork)
    {
        this.assetTypeMetadataRepository = assetTypeMetadataRepository;
        this.simpleUnitOfWork = TenantSimpleUnitOfWork;
    }

    public async Task<int> DeleteAsync(int AssetTypeId)
    {
        return await assetTypeMetadataRepository.DeleteAsset(AssetTypeId);
    }

    public async Task<IEnumerable<AssetTypeMetadata>> GetAssetTypeId(int Id)
    {
        return await assetTypeMetadataRepository.GetAssetTypeId(Id);
    }

    public async Task<IEnumerable<AssetTypeMetadata>> GetAllAssetTypeMetadataList()
    {
        return await assetTypeMetadataRepository.GetAllAssetTypeMetadataList();
    }

    public async Task<IEnumerable<AssetTypeMetadata>> GetAllAsync()
    {
        return await assetTypeMetadataRepository.GetAllAsync();
    }

    public async Task<AssetTypeMetadata> GetAsync(int id)
    {
        return await assetTypeMetadataRepository.GetAsync(id);
    }

    public async Task<int> InsertAsync(IEnumerable<AssetTypeMetadata> assetTypeMetadata)
    {
        return await assetTypeMetadataRepository.InsertAsync(assetTypeMetadata);
    }

    public async Task<int> InsertAsync(AssetTypeMetadata assetTypeMetadata)
    {
        return await assetTypeMetadataRepository.InsertAsync(assetTypeMetadata);
    }

    public async Task<int> UpdateAsync(AssetTypeMetadata assetTypeMetadata)
    {
        return await assetTypeMetadataRepository.UpdateAsync(assetTypeMetadata);
    }

    public async Task<int> UpdateAsync(IEnumerable<AssetTypeMetadata> assetTypeMetadata)
    {
        try
        {
            simpleUnitOfWork.BeginTransaction();
            //await assetTypeMetadataRepository.DeleteAsset(assetTypeMetadata.FirstOrDefault().AssettypeId);
            var NewRecords = assetTypeMetadata.Where(w => w.Id <= 0);
            var result = await assetTypeMetadataRepository.InsertAsync(NewRecords);
            var Exist = assetTypeMetadata.Where(w => w.Id > 0);
            result = await assetTypeMetadataRepository.Update(Exist);
            simpleUnitOfWork.Commit();
            return result;
        }
        catch (Exception ex)
        {
            simpleUnitOfWork.Rollback();
            string msg = ex.Message;
            return 0;
        }
    }

    public async Task<int> DeleteMetadata(int id)
    {
        return await assetTypeMetadataRepository.DeleteMetadata(id);
    }
}
