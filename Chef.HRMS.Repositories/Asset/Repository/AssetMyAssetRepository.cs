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
                            js.assettypename,
		                    js.assetid,
		                    js.assetname,
                            js.allocateddate,
		                    jk.description,
		                    js.status,
                            js.assetraiserequestid
		                    FROM hrms.assetallocated as js
		                    INNER JOIN hrms.asset as jk ON js.assetid = jk.id
		                    WHERE (js.status = 4 OR js.status = 7 OR js.status=8 OR js.status=9 OR js.status=10) AND js.empid=@empid";
            return await Connection.QueryAsync<AssetAllocated>(sql, new { empid = empid });
        }

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

        public async Task<int> UpdateRaiseRequest(AssetRaiseRequest assetRaiseRequest)
        {
                var sql = @"UPDATE hrms.assetmyasset
                        SET assetraiserequestid=@id WHERE assetid=@assetid;
                            UPDATE hrms.assetallocated
                        SET assetraiserequestid=@id WHERE assetid=@assetid";
                var result = await Connection.ExecuteAsync(sql, assetRaiseRequest);
                return result;
        }
        //    else if(assetmyasset.ReturnType != 0)
        //    {
        //        var sql = @"UPDATE hrms.assetraiserequest
        //                SET status=8 WHERE assetid=@assetid";
        //        var result = await Connection.ExecuteAsync(sql, assetmyasset);
        //        return result;
        //    }
        //    else
        //    {
        //        return 0;
        //    }
        //}

        public async Task<int> Update(AssetMyAsset assetmyasset)
        {
            if (assetmyasset.ChangeType != 0)
            {

                var sql = @"Update hrms.assetallocated
                                    Set status=7 where Id=@Id";
                var result = await Connection.ExecuteAsync(sql, assetmyasset);
                return result;
            }

            else if (assetmyasset.ReturnType != 0)
            {
                var sql = @"Update hrms.assetallocated
                                    Set status=8 where Id=@Id";
                var result = await Connection.ExecuteAsync(sql, assetmyasset);
                return result;
            }

            else
            {
                return 0;
            }
        }

        public async Task<int> UpdateAsync(AssetAllocated assetallocated)
        {
            var sql = new QueryBuilder<AssetAllocated>().GenerateUpdateQuery();
            sql = sql.Replace("RETURNING id", "");
            return await Connection.ExecuteAsync(sql, assetallocated);
        }

        //public async Task<int> InsertRequest(AssetRaiseRequest assetRaiseRequest)
        //{
        //    var sql = @"INSERT INTO hrms.assetraiserequest
        //                                (requesteddate, requestfor, requesttype, assettypeid,
        //                                 empid, status,assettypename, assetid)
        //                    VALUES      (@requesteddate,
        //                                 @requestfor,
        //                                 @requesttype,
        //                                 @assettypeid,
        //                                 @empid,
        //                                 @status,
        //                                 @assettypename,
        //                                 @assetid); ";
        //    return await Connection.ExecuteAsync(sql, assetRaiseRequest);
        //}

        public async Task<int> UpdateAsync(AssetRaiseRequest assetRaiseRequest)
        {
            var sql = new QueryBuilder<AssetRaiseRequest>().GenerateUpdateQuery();
            sql = sql.Replace("RETURNING id", "");
            return await Connection.ExecuteAsync(sql, assetRaiseRequest);
        }

        public async Task<int> InsertAsync(AssetRaiseRequest assetRaiseRequest)
        {
            var sql = new QueryBuilder<AssetRaiseRequest>().GenerateInsertQuery();
            sql = sql.Replace("RETURNING id", "");
            assetRaiseRequest.Id = Convert.ToInt32(await Connection.ExecuteScalarAsync(sql, assetRaiseRequest));
            return assetRaiseRequest.Id;
        }
    }
}
