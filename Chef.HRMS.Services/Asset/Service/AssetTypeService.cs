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
    public class AssetTypeService : AsyncService, IAssetTypeService
    {
        private readonly IAssetTypeRepository assetTypeRepository;

        public AssetTypeService(IAssetTypeRepository assetTypeRepository)
        {
            this.assetTypeRepository = assetTypeRepository;
        }

        public async Task<int> InsertAsync(IEnumerable<AssetType> assetType)
        {
            return await assetTypeRepository.InsertAsync(assetType);
        }

        public async Task<AssetType> InsertAsync(AssetType assetType)
        {
            return await assetTypeRepository.InsertAsync(assetType);
        }

        public async Task<IEnumerable<AssetType>>GetAllAssetTypeList()
        {
            return await assetTypeRepository.GetAllAssetTypeList();
        }

        public async Task<int> UpdateAsync(AssetType assetType)
        {
            return await assetTypeRepository.UpdateAsync(assetType);
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await assetTypeRepository.DeleteAsync(id);
        }

        

        public async Task<IEnumerable<AssetType>> GetAllAsync()
        {
            return await assetTypeRepository.GetAllAsync();
        }

        public async Task<IEnumerable<AssetType>> GetAllAssetTypeById(int id)
        {
            return await assetTypeRepository.GetAllAssetTypeById(id);
        }

        public async Task<AssetType> GetAsync(int id)
        {
            return await assetTypeRepository.GetAsync(id);
        }
    }
}
