using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Chef.HRMS.Models.Asset;
using Dapper;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class AssetTypeRepository: GenericRepository<AssetType>, IAssetTypeRepository
    {
        public AssetTypeRepository(IHttpContextAccessor httpContextAccessor, DbSession session) : base(httpContextAccessor, session)
        {
           
        }
        public async Task<int> InsertAsync(IEnumerable<AssetType> assetType)
        {
            var sql = new QueryBuilder<AssetType>().GenerateInsertQuery();
            sql = sql.Replace("RETURNING id", "");

            return await Connection.ExecuteAsync(sql, assetType);
        }

    }
}
