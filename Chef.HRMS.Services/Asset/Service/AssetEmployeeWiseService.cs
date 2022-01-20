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

        public async Task<IEnumerable<AssetEmployeeWise>> GetAll()
        {
            return await assetEmployeeWiseRepository.GetAll();
        }

        public async Task<IEnumerable<AssetAllocated>> GetAllocatedAssetById(int empid)
        {
            return await assetEmployeeWiseRepository.GetAllocatedAssetById(empid);
        }

        public async Task<IEnumerable<AssetEmployeeWise>> GetEmployeeDetailsById(int employeeid)
        {
            return await assetEmployeeWiseRepository.GetEmployeeDetailsById(employeeid);
        }

        public async Task<IEnumerable<AssetRaiseRequest>> GetEmployeeRequestById(int empid)
        {
            return await assetEmployeeWiseRepository.GetEmployeeRequestById(empid);
        }
        public async Task<IEnumerable<AssetRaiseRequest>> GetRequestById(int id)
        {
            return await assetEmployeeWiseRepository.GetRequestById(id);
        }

        public Task<int> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<AssetEmployeeWise>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<AssetEmployeeWise> GetAsync(int id)
        {
            throw new NotImplementedException();
        }


        public Task<AssetEmployeeWise> InsertAsync(AssetEmployeeWise obj)
        {
            throw new NotImplementedException();
        }

        public async Task<int> UpdateApproveReject(int id, int status)
        {
            return await assetEmployeeWiseRepository.UpdateApproveReject(id, status);
            //    var request = assetRaiseRequest.Where(c => c.status = 2);
            //    var result await assetRaiseRequest.UpdateApproveRejectRevoke(request);
            //    return result;
        }

        public Task<int> UpdateAsync(AssetEmployeeWise obj)
        {
            throw new NotImplementedException();
        }

        public async Task<int> UpdateStatus(int id, int status)
        {
            return await assetEmployeeWiseRepository.UpdateStatus(id, status); 
        }

        
    }
}
