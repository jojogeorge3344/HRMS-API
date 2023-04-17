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
    public class AssetTypeRepository: GenericRepository<AssetType>, IAssetTypeRepository
    {
        public AssetTypeRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
           
        }
        public async Task<int> InsertAsync(IEnumerable<AssetType> assetType)
        {
            var sql = new QueryBuilder<AssetType>().GenerateInsertQuery();
            sql = sql.Replace("RETURNING id", "");

            return await Connection.ExecuteAsync(sql, assetType);
        }
        public async Task<IEnumerable<AssetType>> GetAllAssetTypeList()
        {

            var sql = @"select id,assettypename,description from hrms.assettype where isarchived = false order by assettypename asc";  // Added for "where isarchived = false" by Nir

            return await Connection.QueryAsync<AssetType>(sql);
        }

        public async Task<IEnumerable<AssetType>> Get(int id)
        {

            var sql = "SELECT * FROM  hrms.assettype WHERE id = @id";

            return await Connection.QueryAsync<AssetType>(sql, new { id });
        }

    }
}
