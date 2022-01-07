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
    public class AssetTypeMetadataService : AsyncService, IAssetTypeMetadataService
    {
        private readonly IAssetTypeMetadataRepository assetTypeMetadataRepository;
        private readonly ISimpleUnitOfWork simpleUnitOfWork;
        public AssetTypeMetadataService(IAssetTypeMetadataRepository assetTypeMetadataRepository, ISimpleUnitOfWork simpleUnitOfWork)
        {
            this.assetTypeMetadataRepository = assetTypeMetadataRepository;
            this.simpleUnitOfWork = simpleUnitOfWork;
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

        public async Task<AssetTypeMetadata> InsertAsync(AssetTypeMetadata assetTypeMetadata)
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
                var Exist = assetTypeMetadata.Where(w => w.Id >= 0);
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
}
