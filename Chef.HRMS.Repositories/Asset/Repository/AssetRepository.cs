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
    public class AssetRepository : GenericRepository<Asset>, IAssetRepository
    {
        public AssetRepository(IHttpContextAccessor httpContextAccessor, DbSession session) : base(httpContextAccessor, session)
        {

        }

        public async Task<IEnumerable<Asset>> GetAssetById(int Id)
        {
            var sql = "SELECT * FROM hrms.asset WHERE Id=@Id";
            return await Connection.QueryAsync<Asset>(sql, new { Id = Id });
        }


        //public new async Task<Asset> InsertAsync(Asset asset)
        //{
        //    var sql = new QueryBuilder<Asset>().GenerateInsertQuery();

        //    sql = sql.Replace("RETURNING id", "");

        //    return await Connection.QueryFirstOrDefaultAsync<Asset>(sql, asset);
        //}
            //public new async Task<int> InsertAsync(Asset asset)
            //{
            //    using (var transaction = Connection.BeginTransaction())
            //    {
            //        try
            //        {
            //            asset.CreatedBy = "";
            //            asset.CreatedDate = DateTime.UtcNow;
            //            var sql = new QueryBuilder<Asset>().GenerateInsertQuery();
            //            //asset.TotalBalanceAmountInBasecurrency = asset.TotalAmountInBaseCurrency;
            //            //asset.TotalBalanceAmount = asset.TotalAmount;
            //            //asset.Id = Convert.ToInt32(Connection.ExecuteScalar(sql, asset));

            //            //insert payment term header section
            //            if (asset.AssetMetadataValues != null)
            //            {
            //                asset.AssetMetadataValues.AssetId = asset.Id;
            //                asset.AssetMetadataValues.CreatedBy = "";
            //                asset.AssetMetadataValues.CreatedDate = DateTime.UtcNow;

            //                sql = new QueryBuilder<AssetMetadataValue>().GenerateInsertQuery();
            //                asset.AssetMetadataValues.Id = Convert.ToInt32(Connection.ExecuteScalar(sql, asset.AssetMetadataValues));

            //                foreach (AssetMetadataValue value in values)
            //                {
            //                    sql = new QueryBuilder<AssetMetadataValue>().GenerateInsertQuery();
            //                    await Connection.ExecuteScalarAsync(sql, value);
            //                }
            //            }
            //        }
            //    transaction.Commit();
            //    }
            //    catch (Exception ex)
            //    {
            //        transaction.Rollback();
            //        asset.Id = 0;
            //    }
            //}
            //    return asset;
            //}

        public async Task<int> BulkInsertAsync(List<AssetMetadataValue> assetMetadataValues)
        {
            int noOfRows;
            try
            {
                var sql = new QueryBuilder<AssetMetadataValue>().GenerateInsertQuery();
                noOfRows = Convert.ToInt32(await Connection.ExecuteAsync(sql, assetMetadataValues.AsEnumerable()));

            }
            catch (Exception ex)
            {
                string msg = ex.Message;
                noOfRows=0;
            }
            return noOfRows;
        }
        
            public async Task<IEnumerable<Asset>> GetAllAssetList()
        {

            var sql = @"SELECT DISTINCT jt.id, 
                                            jt.assetname,
                                            jt.assettypeid,
                                            jt.assettypemetadataid,
                                            jt.date,
                                            jt.description,
                                            jt.status,
                                            jt.isactive, 
                                            jt.createddate, 
                                            jt.modifieddate, 
                                            jt.createdby, 
                                            jt.modifiedby,
                                            jt.isarchived
                            FROM   hrms.asset AS jt 
                                   INNER JOIN hrms.assettype
                                           ON jt.assettypeid = hrms.assettype.id
                                   INNER JOIN hrms.assettypemetadata
                                           ON jt.assettypeid = hrms.assettypemetadata.assettypeid ";


            return await Connection.QueryAsync<Asset>(sql);
        }

    }
}

