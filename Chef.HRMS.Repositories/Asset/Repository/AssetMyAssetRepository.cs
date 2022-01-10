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
    public class AssetMyAssetRepository : GenericRepository<AssetMyAsset>, IAssetMyAssetRepository
    {
        public AssetMyAssetRepository(IHttpContextAccessor httpContextAccessor, DbSession session) : base(httpContextAccessor, session)
        {

        }

        public async Task<IEnumerable<AssetMyAsset>> GetMyAssetById(int Id)
        {
            var sql = "SELECT * FROM hrms.assetmyasset WHERE Id=@Id";
            return await Connection.QueryAsync<AssetMyAsset>(sql, new { Id = Id });
        }

        //public async Task<int> InsertAsync(IEnumerable<AssetMyAsset> assetmyasset)
        //{
        //    var sql = new QueryBuilder<AssetMyAsset>().GenerateInsertQuery();
        //    sql = sql.Replace("RETURNING id", "");

        //    return await Connection.ExecuteAsync(sql, assetmyasset);
        //}
        public async Task<IEnumerable<AssetMyAsset>> GetAllMyAssetList()
        {

            var sql = @"select id,dateallocated,assettypeid,assetname,valueid,status from hrms.assetmyasset";

            return await Connection.QueryAsync<AssetMyAsset>(sql);
        }

        public async Task<int> InsertAsync(IEnumerable<AssetMyAsset> assetmyasset)
        {
            var sql = new QueryBuilder<AssetMyAsset>().GenerateInsertQuery();
            sql = sql.Replace("RETURNING id", "");

            return await Connection.ExecuteAsync(sql, assetmyasset);
        }

        public async Task<int> UpdateAsync(IEnumerable<AssetMyAsset> assetmyasset)
        {
            var sql = new QueryBuilder<AssetMyAsset>().GenerateUpdateQuery();
            sql = sql.Replace("RETURNING id", "");
            return await Connection.ExecuteAsync(sql, assetmyasset);
        }
    }
}
