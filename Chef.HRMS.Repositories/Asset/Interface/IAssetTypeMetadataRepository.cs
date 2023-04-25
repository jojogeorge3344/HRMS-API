﻿using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IAssetTypeMetadataRepository : IGenericRepository<AssetTypeMetadata>
    {
        Task<int> InsertAsync(IEnumerable<AssetTypeMetadata> assetTypeMetadata);
        Task<int> DeleteAsset(int AssetTypeId);
        Task<int> DeleteMetadata(int id);
        Task<IEnumerable<AssetTypeMetadata>> GetAllAssetTypeMetadataList();
          
        Task<IEnumerable<AssetTypeMetadata>> GetAssetTypeId(int Id);

        Task<int> Update(IEnumerable<AssetTypeMetadata> assetTypeMetadata);

    }
}