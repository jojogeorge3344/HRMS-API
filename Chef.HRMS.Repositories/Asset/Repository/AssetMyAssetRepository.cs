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

        public async Task<IEnumerable<AssetAllocated>> GetMyAssetById(int empid)
        {
            //var sql = "SELECT * FROM hrms.assetmyasset WHERE EmpId=@EmpId";
            var sql = @"SELECT
		                    js.id,
		                    js.empid,
		                    js.assettypeid,
		                    js.assetid,
		                    js.assetname,
		                    jk.description,
		                    js.status
		                    FROM hrms.assetallocated as js
		                    INNER JOIN hrms.asset as jk ON js.assetid = jk.id
		                    WHERE js.status = 4 AND js.empid=@empid";
            return await Connection.QueryAsync<AssetAllocated>(sql, new { empid = empid });
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

        public async Task<int> UpdateStatus(int assetid, int status)
        {
            var sql = @"UPDATE hrms.assetmyasset
                        SET status=@status WHERE assetid=@assetid";
            return await Connection.ExecuteAsync(sql, new { assetid, status });
        }

        //public async Task<int> Update(int status)
        //{
        //    var sql = @"UPDATE hrms.assetmyasset
        //                SET status=@status WHERE id=@assetmyassetid";
        //    return await Connection.ExecuteAsync(sql, new { status });
        //}

        public async Task<int> UpdateAsync(IEnumerable<AssetMyAsset> assetmyasset)
        {
            var sql = new QueryBuilder<AssetMyAsset>().GenerateUpdateQuery();
            sql = sql.Replace("RETURNING id", "");
            return await Connection.ExecuteAsync(sql, assetmyasset);
        }


    }
}
