using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IAssetTypeRepository: IGenericRepository<AssetType>
    {
        Task<int> InsertAsync(IEnumerable<AssetType> assetType);

        Task<IEnumerable<AssetType>> GetAllAssetTypeList();
    }
}
