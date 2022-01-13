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

        public async Task<IEnumerable<AssetMyAsset>> GetMyAssetById(int EmpId)
        {
            var sql = "SELECT * FROM hrms.assetmyasset WHERE EmpId=@EmpId";
            //var sql = @"select
		          //      jt.id,
		          //      jt.empid,
		          //      jt.assetid,
		          //      jt.assettypemetadataid,
		          //      jk.metadata,
		          //      jt.dateallocated,
		          //      jt.metadata,
		          //      jt.assettype,
		          //      jt.assetname,
		          //      jt.assetid,
		          //      jd.value,
		          //      js.description
		          //      FROM hrms.assetmyasset as jt
	
	           //     INNER JOIN hrms.asset as js ON jt.assetid = js.id
	           //     INNER JOIN hrms.assetmetadatavalue as jd ON jt.assetid = jd.assetid
	           //     INNER JOIN hrms.assettypemetadata as jk ON jt.assettypemetadataid = jk.id
	           //     where jt.EmpId=@EmpId";
            return await Connection.QueryAsync<AssetMyAsset>(sql, new { EmpId = EmpId });
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
