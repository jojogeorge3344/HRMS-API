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
    public class AssetRaiseRequestService: AsyncService, IAssetRaiseRequestService
    {
        private readonly IAssetRaiseRequestRepository assetRaiseRequestRepository;

        public AssetRaiseRequestService(IAssetRaiseRequestRepository assetRaiseRequestRepository)
        {
            this.assetRaiseRequestRepository = assetRaiseRequestRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await assetRaiseRequestRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<AssetRaiseRequest>> Get(int id)
        {
            return await assetRaiseRequestRepository.Get(id);
        }

        public async Task<IEnumerable<AssetRaiseRequest>> GetAllAsync()
        {
            return await assetRaiseRequestRepository.GetAllAsync();
        }

        public async Task<IEnumerable<AssetRaiseRequest>> GetAllRaiseRequestList(int empid)
        {
            return await assetRaiseRequestRepository.GetAllRaiseRequestList(empid);
        }

        public async Task<AssetRaiseRequest> GetAsync(int id)
        {
            return await assetRaiseRequestRepository.GetAsync(id);
        }

        public async Task<IEnumerable<AssetEmployeeViewModel>> GetEmployeeDetails()
        {
            return await assetRaiseRequestRepository.GetEmployeeDetails();
        }

        //public async Task<IEnumerable<AssetRaiseRequest>> GetEmployeeDepartmentDetails(int id)
        //{
        //    return await assetRaiseRequestRepository.GetEmployeeDepartmentDetails(id);
        //}

        public async Task<int> InsertAsync(IEnumerable<AssetRaiseRequest> assetRaiseRequest)
        {
            return await assetRaiseRequestRepository.InsertAsync(assetRaiseRequest);
        }

        public async Task<AssetRaiseRequest> InsertAsync(AssetRaiseRequest assetRaiseRequest)
        {
            return await assetRaiseRequestRepository.InsertAsync(assetRaiseRequest);
        }


        public async Task<int> UpdateAsync(AssetRaiseRequest assetRaiseRequest)
        {
            return await assetRaiseRequestRepository.UpdateAsync(assetRaiseRequest);
        }
    }
}
