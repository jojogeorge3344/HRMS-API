using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Models.Asset;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
   public interface IAssetTypeService: IAsyncService<AssetType>
    {
        Task<int> InsertAsync(IEnumerable<AssetType> assetType);
    }
}
