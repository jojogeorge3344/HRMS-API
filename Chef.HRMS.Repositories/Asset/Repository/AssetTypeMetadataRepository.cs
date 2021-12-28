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
            var sql = new QueryBuilder<AssetTypeMetadata>().GenerateInsertQuery();
            sql = sql.Replace("RETURNING id", "");

            return await Connection.ExecuteAsync(sql, assetTypeMetadata);
        }

        

        public async Task<int> DeleteAsset(int assetTypeId)
        {
            var sql = @"DELETE FROM hrms.assettypemetadata WHERE assettypeid = @assettypeid;";
            return await Connection.ExecuteAsync(sql, new { assetTypeId });
        }

        //public async Task<IEnumerable<AssetTypeMetadata>> DeleteAssetType(int assetTypeId)
        //{
        //    var sql = @"DELETE FROM hrms.assettypemetadata WHERE assettypeid = @assettypeid;";
        //    return await Connection.ExecuteAsync(sql ,assetTypeId );
        //}



        //public async Task<int> UpdateAsync(IEnumerable<AssetTypeMetadata> assetTypeMetadata)
        //{
        //    var sql= 
        //}


        //public async Task<int> UpdateAsync(IEnumerable<AssetTypeMetadata> assetTypeMetadata)
        //{
        //    var sql = new QueryBuilder<AssetTypeMetadata>().GenerateUpdateQuery();
        //        //sql = sql.Replace("RETURNING id", "");
        //        int a= await Connection.ExecuteAsync(sql, assetTypeMetadata);
        //        return a;
        //}

        //public async Task<int> UpdateAsync(IEnumerable<AssetTypeMetadata> assetTypeMetadata)
        //{



        //        //    int result = 0;


        //        //    using (var transaction = Connection.BeginTransaction())
        //        //    {
        //        //        try
        //        //        {


        //        //            if (assetTypeMetadata.Count() > 0)
        //        //            {
        //        //                var getvalue = "select * from hrms.assettypemetadata where assettypeid=@assettypeid ";
        //        //                var sq = "DELETE FROM hrms.assettypemetadata WHERE assettypeid = @assettypeid (" + getvalue + ")";

        //        //                var sql = new QueryBuilder<AssetTypeMetadata>().GenerateInsertQuery();
        //        //                sql = sql.Replace("RETURNING id", "");
        //        //                sql += " ON CONFLICT ON CONSTRAINT assetTypeMetadata_fkey DO NOTHING";
        //        //                sql += new QueryBuilder<AssetTypeMetadata>().GenerateUpdateQuery();
        //        //                await Connection.ExecuteAsync(sql, assetTypeMetadata);
        //        //            }



        //        //            transaction.Commit();
        //        //        }
        //        //        catch (Exception ex)
        //        //        {
        //        //            string msg = ex.Message;
        //        //            transaction.Rollback();
        //        //        }
        //        //    }
        //        //    return result;
        //        //}

        //        //}

        //}
    }
}