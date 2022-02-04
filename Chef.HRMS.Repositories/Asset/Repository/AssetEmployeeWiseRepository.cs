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
            var sql = @"SELECT  jt.id,
                                jd.employeeid,
                                jt.firstname,
                                jt.lastname,
                                jd.workertype AS employeestatus
                                       FROM hrms.employee AS jt 
                                       INNER JOIN hrms.jobdetails AS jd ON jt.id = jd.employeeid ORDER BY jt.id";

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

       
        public async Task<IEnumerable<AssetAllocated>> GetAllocatedAssetById(int empid)
        {
               var sql = @"SELECT   id,
                                    empid,
								    assettypeid,
                                    assettypename,
                                    assetid,
								    assetraiserequestid,
                                    assetname,
                                    allocateddate,
                                    status 
                            FROM hrms.assetallocated 
                            WHERE( status = 4 OR status = 8 OR status=9) AND empid=@empid";

            return await Connection.QueryAsync<AssetAllocated>(sql, new { empid });
        }

        

        public async Task<IEnumerable<Asset>> GetAssetDetailsById(int assettypeid)
        {
            var sql = @"SELECT DISTINCT aa.id,
			                            aa.assettypeid,
			                            aa.assettypemetadataid,
			                            aa.valueid,
			                            bb.status,
			                            CONCAT(aa.assetname,'-',aa.valueid)     AS assetname 
		                            FROM hrms.asset AS aa INNER JOIN hrms.assetallocated AS bb 
                                    ON aa.id=bb.assetid WHERE (aa.status=5 and bb.status=5) 
                                                    AND aa.assettypeid=@assettypeid";

            return await Connection.QueryAsync<Asset>(sql, new { assettypeid });
        }


        public async Task<IEnumerable<AssetEmployeeWise>> GetEmployeeDetailsById(int employeeid)
        {
               var sql = @"SELECT   employeeid,
                                    firstname,
                                    jd.workertype AS employeestatus,
                                    jt.name AS designation
                                FROM  hrms.employee INNER JOIN hrms.jobdetails AS jd
                                    ON hrms.employee.id=jd.employeeid INNER JOIN hrms.jobtitle AS jt 
                                    ON jd.jobtitleid=jt.id WHERE employeeid=@employeeid";

            return await Connection.QueryAsync<AssetEmployeeWise>(sql,new { employeeid });
        }


        public async Task<IEnumerable<Employee>> GetEmployeeNameById(int id)
        {
            var sql = @"SELECT firstname,lastname FROM hrms.employee WHERE id=@id";

            return await Connection.QueryAsync<Employee>(sql, new { id });
        }


        public async Task<IEnumerable<AssetRaiseRequest>> GetEmployeeRequestById(int empid)
        {

            var sql= @"SELECT    rr.id,
                                 rr.requestno,
                                 rr.requestfor,
	                             rr.requesttype,
								 CONCAT (firstname ,' ' ,lastname) AS requestedby,
                                 rr.status,
	                             rr.empid,
							     rr.nameofteammemberid,
                                rr. requesteddate
					        FROM hrms.assetraiserequest AS rr INNER JOIN hrms.employee 
                                 ON rr.empid=employee.id WHERE empid=@empid
                                                        ORDER BY id desc";

            return await Connection.QueryAsync<AssetRaiseRequest>(sql, new { empid });
        }


        public async Task<IEnumerable<AssetMetadataValue>> GetMetadatavaluesById(int assetid)
        {
            var sql = @"SELECT  id,
                                assettypeid,
                                assetid,
                                value,
                                assettypemetadataid
                                    FROM hrms.assetmetadatavalue WHERE assetid=@assetid";

            return await Connection.QueryAsync<AssetMetadataValue>(sql, new { assetid });
        }


        public async Task<IEnumerable<AssetRaiseRequest>> GetRequestById(int id)
        {
            var sql = @"SELECT    rr.id,
                                 rr.requestno,
                                 rr.requestfor,
	                             rr.requesttype,
								 tt.id              AS assettypeid,
                                 tt.assettypename,
                                 rr.status,
	                             rr.empid,
								 rr.nameofteammemberid,
							     CONCAT (firstname ,' ',lastname) AS nameofteammember,
                                 rr.requesteddate,
                                 rr.description
					    FROM hrms.assetraiserequest AS rr INNER JOIN hrms.assettype AS tt
					             ON rr.assettypeid=tt.id INNER JOIN hrms.employee AS ee 
                                 ON rr.nameofteammemberid=ee.id
                                                 WHERE rr.id=@id
                                                    ORDER BY rr.id";

            return await Connection.QueryAsync<AssetRaiseRequest>(sql, new { id });
        }


        public async Task<IEnumerable<AssetAllocationViewModel>> GetAllocationDetails(int id)
        {
            var sql = @"SELECT     ar.requestno,
                                   ar.empid          AS requestedby,
                                   ar.description,
                                   CONCAT(ee.firstname,'-',ee.lastname)   AS allocationto
                             FROM hrms.assetraiserequest AS ar INNER JOIN hrms.assettype AS at 
                                    ON ar.assettypeid=at.id INNER JOIN hrms.employee AS ee
                                    ON ar.nameofteammemberid=ee.id 
                                                      WHERE ar.id=@id";

            return await Connection.QueryAsync<AssetAllocationViewModel>(sql, new { id });
        }


        public async Task<IEnumerable<AssetAllocationViewModel>> GetMetadataDetailsById(int assettypeid)
        {
            var sql = @"SELECT  distinct md.id as assetmetadatavalueid,
			                                assetid,
			                                md.assettypeid,
			                                md.value,
			                                valueid
	                                 FROM hrms.assetmetadatavalue as md inner join 
	                                 hrms.asset on md.assetid= asset.id where status=5 and md.assettypeid=@assettypeid";

            return await Connection.QueryAsync<AssetAllocationViewModel>(sql, new { assettypeid });
        }


        public async Task<int> InsertAsync(AssetAllocated assetAllocated)
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
            int result = 0;
            using (var transaction = Connection.BeginTransaction())
            {
                try
                {
                    if (status == @status)
                    {
                        var sql = @"UPDATE hrms.asset
                                            SET status=5 WHERE id=@id;
                                    UPDATE hrms.assetallocated 
                                            SET status=5 WHERE assetid=@id";
                        result = await Connection.ExecuteAsync(sql, new { id, status });
                    }
                    transaction.Commit();
                }
                catch (System.Exception ex)
                {
                    string msg = ex.Message;
                    //return -1;
                    transaction.Rollback();
                }
            }
            return result;
        }


        public async Task<int> UpdateStatusRecalled(int empid, int assetid, int status)
        {
            if(status==@status)
            {
                var sql = @"UPDATE hrms.assetallocated 
                                    SET status=9 WHERE status=4 
                                        AND (empid =@empid AND assetid=@assetid)";

                var result = await Connection.ExecuteAsync(sql, new { empid,assetid, status });
                return result;
            }
            else
            {
                return 0;
            }
        }


        public Task<IEnumerable<AssetEmployeeWise>> GetAllList()
        {
            throw new NotImplementedException();
        }

       
    }
}
