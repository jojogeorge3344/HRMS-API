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

        public AssetService(IAssetRepository assetRepository)
        {
            this.assetRepository = assetRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await assetRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<Asset>> GetAllAsync()
        {
            return await assetRepository.GetAllAsync();
        }

        public async Task<Asset> GetAsync(int id)
        {
            return await assetRepository.GetAsync(id);
        }

        public async Task<int> InsertAsync(IEnumerable<Asset> asset)
        {
            return await assetRepository.InsertAsync(asset);
        }

        public async Task<Asset> InsertAsync(Asset asset)
        {
            return await assetRepository.InsertAsync(asset);
        }

        public async Task<int> UpdateAsync(Asset asset)
        {
            return await assetRepository.UpdateAsync(asset);
        }

        public async Task<IEnumerable<Asset>> GetAllAssetList()
        {
            return await assetRepository.GetAllAssetList();
        }
    }
}
