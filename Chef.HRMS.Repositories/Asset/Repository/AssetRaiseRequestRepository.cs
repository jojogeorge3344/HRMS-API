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
    public class AssetRaiseRequestRepository : GenericRepository<AssetRaiseRequest>, IAssetRaiseRequestRepository
    {
        public AssetRaiseRequestRepository(IHttpContextAccessor httpContextAccessor, DbSession session) : base(httpContextAccessor, session)
        {

        }
        public async Task<int> InsertAsync(IEnumerable<AssetRaiseRequest> assetRaiseRequest)
        {
            var sql = new QueryBuilder<AssetRaiseRequest>().GenerateInsertQuery();
            sql = sql.Replace("RETURNING id", "");

            return await Connection.ExecuteAsync(sql, assetRaiseRequest);
        }
        public async Task<IEnumerable<AssetRaiseRequest>> GetAllRaiseRequestList()
        {

            var sql ="select id,assettypeid, requestno,requesteddate,requestfor,requesttype,status from hrms.assetraiserequest";

            return await Connection.QueryAsync<AssetRaiseRequest>(sql);
        }

        public async Task<IEnumerable<AssetRaiseRequest>> Get(int id)
        {

            var sql = "SELECT * FROM  hrms.assetraiserequest WHERE id = @id";

            return await Connection.QueryAsync<AssetRaiseRequest>(sql, new { id });
        }

    }
}
