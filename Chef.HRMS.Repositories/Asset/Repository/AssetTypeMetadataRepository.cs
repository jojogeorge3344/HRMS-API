using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class AssetTypeMetadataRepository : GenericRepository<AssetTypeMetadata>, IAssetTypeMetadataRepository
    {
        public AssetTypeMetadataRepository(IHttpContextAccessor httpContextAccessor, DbSession session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<AssetTypeMetadata>> GetAssetTypeId(int AssetTypeName)
        {

            var sql = "SELECT id FROM hrms.assettype WHERE AssetTypeName=@AssetTypeName";
            return await Connection.QueryAsync<AssetTypeMetadata>(sql, new { AssetTypeName });
        }

            public async Task<IEnumerable<AssetTypeMetadata>> GetAllAssetTypeMetadataList()
        {
            var sql = @"select assettypename,metadata from hrms.assettypemetadata 
                        inner join  hrms.assettype on hrms.assettype.id=hrms.assettypemetadata.assettypeid";

            return await Connection.QueryAsync<AssetTypeMetadata>(sql);
        }

        public async Task<int> InsertAsync(IEnumerable<AssetTypeMetadata> assetTypeMetadata)
        {
            var sql = new QueryBuilder<AssetType>().GenerateInsertQuery();
            sql = sql.Replace("RETURNING id", "");

            return await Connection.ExecuteAsync(sql, assetTypeMetadata);
        }
    }
}
