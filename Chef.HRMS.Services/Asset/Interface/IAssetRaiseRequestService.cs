﻿using Chef.Common.Services;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
   public  interface IAssetRaiseRequestService: IAsyncService<AssetRaiseRequest>
    {
        Task<int> InsertAsync(IEnumerable<AssetRaiseRequest> assetRaiseRequest);

        Task<IEnumerable<AssetRaiseRequest>> GetAllRaiseRequestList();

        Task<IEnumerable<AssetRaiseRequest>> Get(int id);

        //Task<IEnumerable<AssetRaiseRequest>> GetEmployeeDepartmentDetails(int id);




    }
}
