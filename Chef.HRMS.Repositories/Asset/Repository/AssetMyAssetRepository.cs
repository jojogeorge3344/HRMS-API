﻿namespace Chef.HRMS.Repositories;

public class AssetMyAssetRepository : GenericRepository<AssetMyAsset>, IAssetMyAssetRepository
{
    public AssetMyAssetRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
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

    

    public async Task<int> Update(AssetMyAsset assetmyasset)
    {
        if (assetmyasset.ChangeType != 0)
        {

            var sql = @"Update hrms.assetallocated
                                    Set status=7 where Id=@Id;
                            UPDATE hrms.assetraiserequest
                                  SET status=7,requesttype=2 WHERE status=4 and assetid=@assetid";
            var result = await Connection.ExecuteAsync(sql, assetmyasset);
            return result;
        }

        else if (assetmyasset.ReturnType != 0)
        {
            var sql = @"Update hrms.assetallocated
                                    Set status=8 where Id=@Id;
                            UPDATE hrms.assetraiserequest
                                  SET status=8,requesttype=3 WHERE status=4 and assetid=@assetid";
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


}
