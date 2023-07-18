using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;

namespace Chef.HRMS.Services;

public class AssetRaiseRequestService : AsyncService<AssetRaiseRequest>, IAssetRaiseRequestService
{
    private readonly ITenantSimpleUnitOfWork simpleUnitOfWork;
    private readonly IAssetRaiseRequestRepository assetRaiseRequestRepository;

    public AssetRaiseRequestService(IAssetRaiseRequestRepository assetRaiseRequestRepository, ITenantSimpleUnitOfWork simpleUnitOfWork)
    {
        this.assetRaiseRequestRepository = assetRaiseRequestRepository;
        this.simpleUnitOfWork = simpleUnitOfWork;
    }

    public async Task<IEnumerable<AssetRaiseRequest>> Get(int id)
    {
        return await assetRaiseRequestRepository.Get(id);
    }

    public async Task<IEnumerable<AssetRaiseRequest>> GetAllRaiseRequestList(int empid)
    {
        return await assetRaiseRequestRepository.GetAllRaiseRequestList(empid);
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

    public new async Task<AssetRaiseRequest> InsertAsync(AssetRaiseRequest assetRaiseRequest)
    {
        try
        {
            simpleUnitOfWork.BeginTransaction();
            var result = await assetRaiseRequestRepository.InsertAsync(assetRaiseRequest);
            assetRaiseRequest.RequestNo = "REQ-" + assetRaiseRequest.Id;
            await assetRaiseRequestRepository.UpdateAsync(assetRaiseRequest);
            simpleUnitOfWork.Commit();
            return assetRaiseRequest;
        }

        catch (Exception ex)
        {
            simpleUnitOfWork.Rollback();
            string msg = ex.Message;
            return assetRaiseRequest;
        }
    }

    public async Task<int> UpdateRevoke(int id)
    {
        return await assetRaiseRequestRepository.UpdateRevoke(id);
    }

    public async Task<string> GenerateNewDocumentNumberAsync(string code)
    {
        return await assetRaiseRequestRepository.GenerateNewDocumentNumberAsync(code);
    }
}
