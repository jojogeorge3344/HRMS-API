using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IAssetRaiseRequestService : IAsyncService<AssetRaiseRequest>
{
    Task<int> InsertAsync(IEnumerable<AssetRaiseRequest> assetRaiseRequest);

    Task<IEnumerable<AssetRaiseRequest>> GetAllRaiseRequestList(int empid);

    Task<IEnumerable<AssetRaiseRequest>> Get(int id);

    public Task<IEnumerable<AssetEmployeeViewModel>> GetEmployeeDetails();

    Task<int> UpdateRevoke(int id);
    Task<string> GenerateNewDocumentNumberAsync(string code);



    //Task<IEnumerable<AssetRaiseRequest>> GetEmployeeDepartmentDetails(int id);






}
