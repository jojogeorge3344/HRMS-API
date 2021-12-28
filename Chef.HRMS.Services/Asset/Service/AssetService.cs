using Chef.Common.Repositories;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class AssetService : AsyncService, IAssetService
    {
        private readonly IAssetRepository assetRepository;
        private readonly ISimpleUnitOfWork simpleUnitOfWork;

        public AssetService(IAssetRepository assetRepository, ISimpleUnitOfWork simpleUnitOfWork)
        {
            this.assetRepository = assetRepository;
            this.simpleUnitOfWork = simpleUnitOfWork;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await assetRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<Asset>> GetAllAsync()
        {
            return await assetRepository.GetAllAsync();
        }

        public async Task<IEnumerable<Asset>> GetAssetById(int Id)
        {
            return await assetRepository.GetAssetById(Id);
        }


        public async Task<Asset> GetAsync(int id)
        {
            return await assetRepository.GetAsync(id);
        }


        public async Task<int> UpdateAsync(Asset asset)
        {
            return await assetRepository.UpdateAsync(asset);
        }

        public async Task<IEnumerable<Asset>> GetAllAssetList()
        {
            return await assetRepository.GetAllAssetList();
        }

        public  async Task<Asset> InsertAsync(Asset asset)
        {
            try
            {
                simpleUnitOfWork.BeginTransaction();
                var result = await assetRepository.InsertAsync(asset);
                if (asset.AssetMetadataValues !=null)
                {
                    asset.AssetMetadataValues.ForEach(c => c.AssetId = result.Id);
                    var res = await assetRepository.BulkInsertAsync(asset.AssetMetadataValues);
                }
                simpleUnitOfWork.Commit();
            }
            catch (Exception ex)
            {
                simpleUnitOfWork.Rollback();
                string msg = ex.Message;
                asset.Id=0;
            }


            return asset;
        }       
    }
}
