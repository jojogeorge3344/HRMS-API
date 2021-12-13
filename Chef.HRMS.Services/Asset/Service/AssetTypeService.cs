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

        public Task<int> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<AssetType>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<AssetType> GetAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<int> InsertAsync(IEnumerable<AssetType> assetType)
        {
            return await assetTypeRepository.InsertAsync(assetType);
        }

        public async Task<AssetType> InsertAsync(AssetType assetType)
        {
            return await assetTypeRepository.InsertAsync(assetType);
        }

        public Task<int> UpdateAsync(AssetType obj)
        {
            throw new NotImplementedException();
        }
    }
}
