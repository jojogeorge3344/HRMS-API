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
    public class AssetEmployeeWiseService : AsyncService, IAssetEmployeeWiseService
    {
        private readonly IAssetEmployeeWiseRepository assetEmployeeWiseRepository;

        public AssetEmployeeWiseService(IAssetEmployeeWiseRepository assetEmployeeWiseRepository)
        {
            this.assetEmployeeWiseRepository = assetEmployeeWiseRepository;
        }

        public Task<int> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }


        public async Task<IEnumerable<AssetEmployeeWise>> GetAll()
        {
            return await assetEmployeeWiseRepository.GetAll();
        }

        public Task<IEnumerable<AssetEmployeeWise>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<AssetEmployeeWise>> GetAllList()
        {
            return await assetEmployeeWiseRepository.GetAllList();
        }

        public async Task<IEnumerable<AssetMyAsset>> GetAllocatedAssetById(int empid)
        {
            return await assetEmployeeWiseRepository.GetAllocatedAssetById(empid); 
        }

        public async Task<IEnumerable<AssetAllocated>> GetAllocatedById(int empid)
        {
            return await assetEmployeeWiseRepository.GetAllocatedById(empid);
        }

        public Task<AssetEmployeeWise> GetAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<AssetEmployeeWise>> GetEmployeeDetailsById(int employeeid)
        {
            return await assetEmployeeWiseRepository.GetEmployeeDetailsById(employeeid);
        }

        public async Task<IEnumerable<AssetEmployeeWiseRequest>> GetEmployeeRequestById(int empid)
        {
            return await assetEmployeeWiseRepository.GetEmployeeRequestById(empid);
        }

        public Task<AssetEmployeeWise> InsertAsync(AssetEmployeeWise obj)
        {
            throw new NotImplementedException();
        }

        

        public Task<int> UpdateAsync(AssetEmployeeWise obj)
        {
            throw new NotImplementedException();
        }

        public async Task<int> UpdateStatus(IEnumerable<AssetEmployeeWiseRequest> assetEmployeeWiseRequest)
        {
            return await assetEmployeeWiseRepository.UpdateStatus(assetEmployeeWiseRequest);
        }
    }
}
