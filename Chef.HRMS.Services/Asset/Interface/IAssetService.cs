using Chef.Common.Services;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IAssetService : IAsyncService<Asset>
    {
        //new Task<int> InsertAsync(Asset asset);

        
        Task<IEnumerable<Asset>> GetAllAssetList();
        Task<IEnumerable<Asset>> GetAssetById(int Id);
    }
}
