using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IAssetEmployeeWiseService : IAsyncService<AssetEmployeeWise>
{
    Task<IEnumerable<AssetEmployeeWise>> GetAll();
    Task<IEnumerable<AssetCountViewModel>> GetAllCount();
    Task<IEnumerable<AssetEmployeeWise>> GetEmployeeDetailsById(int employeeid);
    Task<IEnumerable<AssetRaiseRequest>> GetEmployeeRequestById(int empid);
    Task<IEnumerable<AssetRaiseRequest>> GetRequestById(int id);
    Task<IEnumerable<HRMSEmployee>> GetEmployeeNameById(int id);
    Task<IEnumerable<AssetAllocated>> GetAllocatedAssetById(int empid);
    Task<IEnumerable<Asset>> GetAssetDetailsById(int assettypeid);
    Task<IEnumerable<AssetMetadataValue>> GetMetadatavaluesById(int assetid);
    Task<IEnumerable<AssetAllocationViewModel>> GetAllocationDetails(int id);
    Task<IEnumerable<AssetAllocationViewModel>> GetMetadataDetailsById(int assettypeid);
    Task<IEnumerable<AssetViewModel>> GetAssetId(int assetraiserequestid);
    Task<IEnumerable<AssetReasonViewModel>> GetReasonAndDescription(int assetraiserequestid, int status, int assetid);
    Task<int> InsertAsync(IEnumerable<AssetAllocated> assetAllocated);
    Task<int> InsertAllocate(IEnumerable<AssetAllocated> assetAllocated);
    Task<int> UpdateStatus(int id, int status);
    Task<int> UpdateAllocateStatus(int id, int assetraiserequestid, int status);
    Task<int> UpdateApproveReject(int id, int status);
    Task<int> UpdateStatusRecalled(int empid, int assetid, int status);

    Task<int> UpdateReturnStatus(int assetid, int status, int assetraiserequestid);
}
