using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IAssetEmployeeWiseRepository : IGenericRepository<AssetEmployeeWise>
    {
       
        Task<IEnumerable<AssetEmployeeWise>> GetAll();

        Task<IEnumerable<AssetEmployeeWise>> GetAllList();

        Task<IEnumerable<AssetEmployeeWise>> GetEmployeeDetailsById(int employeeid);

        Task<IEnumerable<AssetRaiseRequest>> GetEmployeeRequestById(int empid);

        Task<IEnumerable<AssetMyAsset>> GetAllocatedAssetById(int empid);

        //Task<IEnumerable<AssetAllocated>> GetAllocatedById(int empid);

        Task<int> UpdateStatus(int id, int status);
    }
}
