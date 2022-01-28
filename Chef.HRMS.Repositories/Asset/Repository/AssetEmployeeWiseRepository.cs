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
    public class AssetEmployeeWiseRepository : GenericRepository<AssetEmployeeWise>, IAssetEmployeeWiseRepository
    {
        public AssetEmployeeWiseRepository(IHttpContextAccessor httpContextAccessor, DbSession session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<AssetEmployeeWise>> GetAll()
        {
            var sql = @"select jt.id,
                        jd.employeeid,
                        jt.firstname,
                        jt.lastname,
                        jd.workertype as employeestatus
                               from hrms.employee as jt 
                               inner join hrms.jobdetails as jd on jt.id = jd.employeeid";
            return await Connection.QueryAsync<AssetEmployeeWise>(sql);
        }

        public async Task<IEnumerable<AssetCountViewModel>> GetAllCount()
        {
            var sql = @"SELECT * FROM(		
                            SELECT empid, COUNT(*) AS allocatedasset
                            FROM hrms.assetallocated 
                            WHERE status = 4
                            GROUP BY empid)a
                            FULL JOIN
                            (SELECT empid, COUNT(*) AS requests
                            FROM hrms.assetraiserequest
                            WHERE status = 1
                            GROUP BY empid)b USING(empid)";
            return await Connection.QueryAsync<AssetCountViewModel>(sql);
        }

        public Task<IEnumerable<AssetEmployeeWise>> GetAllList()
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<AssetAllocated>> GetAllocatedAssetById(int empid)
        {
            var sql = @"SELECT id,
                                empid,
								assettypeid,
                                assettypename,
                                assetid,
                                assetname,
                                allocateddate,
                                status 
                        FROM hrms.assetallocated WHERE empid =@empid";

            return await Connection.QueryAsync<AssetAllocated>(sql, new { empid });
        }

        public async Task<IEnumerable<Asset>> GetAssetDetailsById(int assettypeid)
        {
            var sql = @"select id,
		                        assetname
		                        from hrms.asset where status=5 and assettypeid=@assettypeid";
            return await Connection.QueryAsync<Asset>(sql, new { assettypeid });
        }

        //public async Task<IEnumerable<AssetMetadataValue>> GetChangeSwapDetails(int assetid)
        //{
        //    var sql = @"SELECT jt.id,
        //                        jt.assetname,
        //                        jt.assettypeid,
        //                        js.assettypemetadataid,
        //                        jt.date,
        //                        jt.description,
        //                        jt.status,
        //                        js.value,
        //                        js.id,
        //                        jd.metadata
        //                        FROM hrms.assetmetadatavalue AS js
        //                        INNER JOIN hrms.asset AS jt
        //                        ON js.assetid = jt.id
        //inner join hrms.assettypemetadata as jd on 
        //js.assettypemetadataid=jd.id  where js.assetid=@assetid";
        //    return await Connection.QueryAsync<AssetMetadataValue>(sql, new { assetid });
        //}

        public async Task<IEnumerable<AssetEmployeeWise>> GetEmployeeDetailsById(int employeeid)
        {
            var sql = @"select employeeid,
                                firstname,
                                jd.workertype as employeestatus,
                                jt.name as designation
                                from  hrms.employee inner join hrms.jobdetails as jd 
                                    on hrms.employee.id=jd.employeeid 
									inner join hrms.jobtitle as jt on jd.jobtitleid=jt.id
									where employeeid=@employeeid";
            return await Connection.QueryAsync<AssetEmployeeWise>(sql,new { employeeid });
        }

        public async Task<IEnumerable<Employee>> GetEmployeeNameById(int id)
        {
            var sql = @"select firstname,lastname from hrms.employee where id=@id";
            return await Connection.QueryAsync<Employee>(sql, new { id });
        }

        public async Task<IEnumerable<AssetRaiseRequest>> GetEmployeeRequestById(int empid)
        {

            var sql= @"SELECT    rr.id,
                                 rr.requestno,
                                 rr.requestfor,
	                             rr.requesttype,
								 concat (firstname ,' ' ,lastname) as requestedby,
                                 rr.status,
	                             rr.empid,
							     rr.nameofteammemberid,
                                rr. requesteddate
					 FROM hrms.assetraiserequest as rr inner join hrms.employee on rr.empid=employee.id
                                 WHERE empid=@empid
                                        ORDER BY id";

            return await Connection.QueryAsync<AssetRaiseRequest>(sql, new { empid });

        }

        public async Task<IEnumerable<AssetMetadataValue>> GetMetadatavaluesById(int assetid)
        {
            var sql = @"select  assetid,
                                value,
                                assettypemetadataid
                                    from hrms.assetmetadatavalue where assetid=@assetid";

            return await Connection.QueryAsync<AssetMetadataValue>(sql, new { assetid });
        }

        public async Task<IEnumerable<AssetRaiseRequest>> GetRequestById(int id)
        {
            var sql = @"SELECT    rr.id,
                                 rr.requestno,
                                 rr.requestfor,
	                             rr.requesttype,
								 tt.id as assettypeid,
                                 tt.assettypename,
                                 rr.status,
	                             rr.empid,
								 rr.nameofteammemberid,
							     concat (firstname ,' ',lastname) as nameofteammember,
                                 rr.requesteddate,
                                 rr.description
					 FROM hrms.assetraiserequest as rr inner join hrms.assettype as tt
					 on rr.assettypeid=tt.id
					 inner join hrms.employee as ee on rr.nameofteammemberid=ee.id
                                 WHERE rr.id=@id
                                    ORDER BY rr.id";

            return await Connection.QueryAsync<AssetRaiseRequest>(sql, new { id });
        }

        public async Task<int> InsertAsync(IEnumerable<AssetAllocated> assetAllocated)
        {
            var sql = new QueryBuilder<AssetAllocated>().GenerateInsertQuery();
            sql = sql.Replace("RETURNING id", "");

            return await Connection.ExecuteAsync(sql, assetAllocated);
        }

        public async Task<int> UpdateApproveReject(int id, int status)
        {
            if (status == 2 || status == 3)
            {
                var sql = @"UPDATE hrms.assetraiserequest 
                                    SET status=@status WHERE id=@id";
                var result = await Connection.ExecuteAsync(sql, new { id, status });
                return result;
            }
            
            else
            {
                return 0;
            }
            
        }

        public async Task<int> UpdateStatus(int id, int status)
        {
            var sql = @"UPDATE hrms.assetraiserequest 
                                    SET status=@status WHERE id=@id";
            return await Connection.ExecuteAsync(sql, new { id, status });
        }

        public async Task<int> UpdateStatusRecalled(int empid, int assetid, int status)
        {
            if(status==4)
            {
                var sql = @"Update hrms.assetallocated set status=9 where empid =@empid and assetid=@assetid";
                var result = await Connection.ExecuteAsync(sql, new { empid,assetid, status });
                return result;
            }
            else
            {
                return 0;
            }
        }
    }
}
