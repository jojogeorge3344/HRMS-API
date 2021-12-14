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


        public async Task<int> InsertAsync(IEnumerable<Asset> asset)
        {
            var sql = new QueryBuilder<Asset>().GenerateInsertQuery();
            sql = sql.Replace("RETURNING id", "");

            return await Connection.ExecuteAsync(sql, asset);
        }


        public async Task<IEnumerable<Asset>> GetAllAssetList()
        {

            var sql = @"SELECT DISTINCT jt.id, 
                                            jt.assetname, 
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

