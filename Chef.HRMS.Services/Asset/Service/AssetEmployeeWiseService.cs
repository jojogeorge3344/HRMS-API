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
    public class AssetEmployeeWiseService : AsyncService, IAssetEmployeeWiseService
    {
        private readonly IAssetEmployeeWiseRepository assetEmployeeWiseRepository;
        private readonly ISimpleUnitOfWork simpleUnitOfWork;

        public AssetEmployeeWiseService(IAssetEmployeeWiseRepository assetEmployeeWiseRepository, ISimpleUnitOfWork simpleUnitOfWork)
        {
            this.assetEmployeeWiseRepository = assetEmployeeWiseRepository;
            this.simpleUnitOfWork = simpleUnitOfWork;
        }


        public async Task<IEnumerable<AssetEmployeeWise>> GetAll()
        {
            return await assetEmployeeWiseRepository.GetAll();
        }


        public async Task<IEnumerable<AssetCountViewModel>> GetAllCount()
        {
            return await assetEmployeeWiseRepository.GetAllCount();
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


        public async Task<IEnumerable<Employee>> GetEmployeeNameById(int id)
        {
            return await assetEmployeeWiseRepository.GetEmployeeNameById(id);
        }      


        public async Task<IEnumerable<Asset>> GetAssetDetailsById(int assettypeid)
        {
            return await assetEmployeeWiseRepository.GetAssetDetailsById(assettypeid);
        }


        public async Task<IEnumerable<AssetMetadataValue>> GetMetadatavaluesById(int assetid)
        {
            return await assetEmployeeWiseRepository.GetMetadatavaluesById(assetid);
        }
        public async Task<IEnumerable<AssetViewModel>> GetAssetId(int assetraiserequestid)
        {
            return await assetEmployeeWiseRepository.GetAssetId(assetraiserequestid);
        }

        public async Task<IEnumerable<AssetReasonViewModel>> GetReasonAndDescription(int assetraiserequestid, int status, int assetid)
        {
            return await assetEmployeeWiseRepository.GetReasonAndDescription(assetraiserequestid, status, assetid);
        }

        public async Task<IEnumerable<AssetAllocationViewModel>> GetAllocationDetails(int id)
        {
            return await assetEmployeeWiseRepository.GetAllocationDetails(id);
        }


        public async Task<IEnumerable<AssetAllocationViewModel>> GetMetadataDetailsById(int assettypeid)
        {
            return await assetEmployeeWiseRepository.GetMetadataDetailsById(assettypeid);
        }

        public async Task<AssetAllocated> InsertAsync(AssetAllocated assetAllocated)
        {
            //return await assetEmployeeWiseRepository.InsertAsync(assetAllocated);
            try
            {
                simpleUnitOfWork.BeginTransaction();
                var result = await assetEmployeeWiseRepository.InsertAsync(assetAllocated);
                assetAllocated.AllocationId = "AL- " + assetAllocated.Id;
                var update = await assetEmployeeWiseRepository.UpdateAsync(assetAllocated);
                simpleUnitOfWork.Commit();
                return assetAllocated;
            }

            catch (Exception ex)
            {
                simpleUnitOfWork.Rollback();
                string msg = ex.Message;
                return assetAllocated;
            }
        }
        public async Task<int> InsertAllocate(IEnumerable<AssetAllocated> assetAllocated)
        {
            try
            {
                simpleUnitOfWork.BeginTransaction();
                var result = await assetEmployeeWiseRepository.InsertAsync(assetAllocated);
                var exist = assetAllocated.Where(w => w.AssetId > 0);
                result = await assetEmployeeWiseRepository.UpdateAssetStatus(exist);
                // result = await assetEmployeeWiseRepository.UpdateRequest(result);
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


        public async Task<int> UpdateApproveReject(int id, int status)
        {
            return await assetEmployeeWiseRepository.UpdateApproveReject(id, status);
        }


        public async Task<int> UpdateStatus(int id, int status)
        {
            var result=await assetEmployeeWiseRepository.UpdateStatus(id, status);
            result = await assetEmployeeWiseRepository.Delete(id);
            return result;
        }


        public async Task<int> UpdateStatusRecalled(int empid, int assetid, int status)
        {
            return await assetEmployeeWiseRepository.UpdateStatusRecalled(empid, assetid, status);
        }

        public async Task<int> UpdateAllocateStatus(int id, int assetraiserequestid, int status)
        {
            return await assetEmployeeWiseRepository.UpdateAllocateStatus(id, assetraiserequestid, status);
        }

        public async Task<int> UpdateReturnStatus(int assetid, int status, int assetraiserequestid)
        {
            return await assetEmployeeWiseRepository.UpdateReturnStatus(assetid, status, assetraiserequestid);
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

       
        public Task<int> UpdateAsync(AssetEmployeeWise obj)
        {
            throw new NotImplementedException();
        }

    }
}
