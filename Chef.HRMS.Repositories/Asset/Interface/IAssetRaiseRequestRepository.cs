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

        Task<IEnumerable<AssetRaiseRequest>> GetAllRaiseRequestList();

        Task<IEnumerable<AssetRaiseRequest>> Get(int id);

        Task<IEnumerable<AssetRaiseRequest>> GetEmployeeDepartmentDetails(int id);

    }
}
