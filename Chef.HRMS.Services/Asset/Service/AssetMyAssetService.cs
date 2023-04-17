using Chef.Common.Core.Services;
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
    public class AssetMyAssetService : AsyncService<AssetEmployeeWise>, IAssetMyAssetService
    {
        private readonly IAssetMyAssetRepository assetMyAssetRepository;
        private readonly ITenantSimpleUnitOfWork simpleUnitOfWork;

        public AssetMyAssetService(IAssetMyAssetRepository assetMyAssetRepository, ITenantSimpleUnitOfWork simpleUnitOfWork)
        {
            this.assetMyAssetRepository = assetMyAssetRepository;
            this.simpleUnitOfWork = simpleUnitOfWork;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await assetMyAssetRepository.DeleteAsync(id);
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

        public Task<int> UpdateAsync(AssetMyAsset obj)
        {
            throw new NotImplementedException();
        }
    }
}
