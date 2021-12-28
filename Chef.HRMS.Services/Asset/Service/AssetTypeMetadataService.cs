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

        public AssetTypeMetadataService(IAssetTypeMetadataRepository assetTypeMetadataRepository)
        {
            this.assetTypeMetadataRepository = assetTypeMetadataRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await assetTypeMetadataRepository.DeleteAsync(id);
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
    }
}
