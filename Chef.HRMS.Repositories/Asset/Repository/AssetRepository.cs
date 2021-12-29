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
            //var sql = "SELECT * FROM hrms.asset WHERE Id=@Id";
            var sql = @"SELECT  jt.id, 
                                            jt.assetname,
                                            jt.assettypeid,
                                            jt.assettypemetadataid,
                                            jt.date,
                                            jt.description,
                                            jt.status,
											js.value,
                                            jt.isactive, 
                                            jt.createddate, 
                                            jt.modifieddate, 
                                            jt.createdby, 
                                            jt.modifiedby,
                                            jt.isarchived
                            FROM   hrms.asset AS jt
                                   INNER JOIN hrms.assetmetadatavalue AS js
                                           ON jt.id = js.assetid";

            return await Connection.QueryAsync<Asset>(sql, new { Id = Id });
        }

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

        public async Task<int> BulkUpdateAsync(List<AssetMetadataValue> assetMetadataValues)
        {
            int noOfRows;
            try
            {
                var sql = new QueryBuilder<AssetMetadataValue>().GenerateUpdateQuery();
                noOfRows = Convert.ToInt32(await Connection.ExecuteAsync(sql, assetMetadataValues.AsEnumerable()));

            }
            catch (Exception ex)
            {
                string msg = ex.Message;
                noOfRows = 0;
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

        //public async Task<int> Update(int id)
        //{
        //    var sql = "UPDATE assetname,isactive,description FROM hrms.asset WHERE Id=@Id";
        //    return await Connection.QueryAsync<Asset>(sql, new { Id = Id });
        //}
    }
}

