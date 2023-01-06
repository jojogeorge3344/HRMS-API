using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IAssetRaiseRequestRepository: IGenericRepository<AssetRaiseRequest>
    {
        Task<int> InsertAsync(IEnumerable<AssetRaiseRequest> assetRaiseRequest);

        Task<IEnumerable<AssetRaiseRequest>> GetAllRaiseRequestList(int empid);

        Task<IEnumerable<AssetRaiseRequest>> Get(int id);

        public Task<IEnumerable<AssetEmployeeViewModel>> GetEmployeeDetails();

        Task<int> UpdateRevoke(int id);
        Task<string> GenerateNewDocumentNumberAsync(string code);

        //Task<IEnumerable<AssetRaiseRequest>> GetEmployeeDepartmentDetails(int id);

    }
}
