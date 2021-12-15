﻿using Chef.Common.Services;
using Chef.HRMS.Models;
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

        Task<IEnumerable<AssetType>> GetAllAssetTypeList();

        Task<IEnumerable<AssetType>> Get(int id);





    }
}
