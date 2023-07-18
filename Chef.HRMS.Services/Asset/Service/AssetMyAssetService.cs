using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;

namespace Chef.HRMS.Services;

public class AssetMyAssetService : AsyncService<AssetMyAsset>, IAssetMyAssetService
{
    private readonly IAssetMyAssetRepository assetMyAssetRepository;
    private readonly ITenantSimpleUnitOfWork simpleUnitOfWork;

    public AssetMyAssetService(IAssetMyAssetRepository assetMyAssetRepository, ITenantSimpleUnitOfWork simpleUnitOfWork)
    {
        this.assetMyAssetRepository = assetMyAssetRepository;
        this.simpleUnitOfWork = simpleUnitOfWork;
    }


    public async Task<IEnumerable<AssetMyAsset>> GetAllAsync()
    {
        return await assetMyAssetRepository.GetAllAsync();
    }

    public async Task<IEnumerable<AssetAllocated>> GetMyAssetById(int empid)
    {
        return await assetMyAssetRepository.GetMyAssetById(empid);
    }


    public async Task<AssetMyAsset> GetAsync(int id)
    {
        return await assetMyAssetRepository.GetAsync(id);
    }


    public async Task<IEnumerable<AssetMyAsset>> GetAllMyAssetList()
    {
        return await assetMyAssetRepository.GetAllMyAssetList();
    }

    public async Task<int> InsertAsync(IEnumerable<AssetMyAsset> assetmyasset)
    {
        return await assetMyAssetRepository.InsertAsync(assetmyasset);
    }

    public async Task<int> InsertAsync(AssetMyAsset assetmyasset)
    {
        return await assetMyAssetRepository.InsertAsync(assetmyasset);
    }

    //public async Task<int> UpdateStatus(int assetid)
    //{
    //    return await assetMyAssetRepository.UpdateStatus(assetid);
    //}

    public async Task<int> Update(AssetMyAsset assetmyasset)
    {
        try
        {
            simpleUnitOfWork.BeginTransaction();
            //var exists = await assetMyAssetRepository.UpdateStatus(assetmyasset);
            var result = await assetMyAssetRepository.Update(assetmyasset);
            //var exists = result;
            await assetMyAssetRepository.InsertAsync(assetmyasset);
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
}
