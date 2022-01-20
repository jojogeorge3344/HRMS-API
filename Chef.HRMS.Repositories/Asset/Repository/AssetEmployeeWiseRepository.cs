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
						allocatedasset,
                        requests,
                        jd.workertype as employeestatus
                               from hrms.employee as jt inner join

                               hrms.assetemployeewise on jt.id = assetemployeewise.employeeid

                               inner join hrms.jobdetails as jd on jt.id = jd.employeeid";
            return await Connection.QueryAsync<AssetEmployeeWise>(sql);
        }


        //public async Task<IEnumerable<AssetEmployeeWise>> GetAllEmployeeDetails()
        //{
        //     var sql = @"select jt.employeeid,
        //                     jt.firstname,
        //                     jt.lastname,
        //                        jt.allocatedasset,
        //                        jt.requests,
        //                        jt.employeestatus
        //                        from hrms.assetemployeewise as jt inner join  hrms.employee on hrms.employee.id=jt.employeeid";
        //    return await Connection.QueryAsync<AssetEmployeeWise>(sql);
        //}




        public Task<IEnumerable<AssetEmployeeWise>> GetAllList()
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<AssetAllocated>> GetAllocatedAssetById(int empid)
        {
            var sql = @"SELECT al.id,
                                al.empid,
								tt.id as assettypeid,
                                tt.assettypename,
                                al.assetid,
                                al.assetname,
                                al.allocateddate,
                                al.status 
                        FROM hrms.assetallocated as al inner join hrms.assettype as tt 
						on al.assettypeid =tt.id WHERE empid = @empid";

            return await Connection.QueryAsync<AssetAllocated>(sql, new { empid });
        }

        //public async Task<IEnumerable<AssetAllocated>> GetAllocatedById(int empid)
        //{
        //    var sql = @"select empid,
        //                                    valueid as assetid,
        //                                    assetname,
        //                                    metadata from hrms.assetmyasset where empid=@empid";
        //    return await Connection.QueryAsync<AssetAllocated>(sql, new { empid });
        //}

        public async Task<IEnumerable<AssetEmployeeWise>> GetEmployeeDetailsById(int employeeid)
        {
            var sql = @"select employeeid,
                                firstname,
                                jd.workertype as employeestatus,
                                jd.jobtitleid as designation
                                from  hrms.employee inner join hrms.jobdetails as jd 
                                    on hrms.employee.id=jd.employeeid where employeeid=@employeeid";
            return await Connection.QueryAsync<AssetEmployeeWise>(sql,new { employeeid });
        }

        public async Task<IEnumerable<AssetRaiseRequest>> GetEmployeeRequestById(int empid)
        {

            var sql= @"SELECT    id,
                                 requestno,
                                 requestfor,
	                             requesttype,
                                 status,
	                             empid,
							     nameofteammember,
                                 requesteddate
					 FROM hrms.assetraiserequest
                                 WHERE empid=@empid";

            return await Connection.QueryAsync<AssetRaiseRequest>(sql, new { empid });

        }

        public async Task<IEnumerable<AssetRaiseRequest>> GetRequestById(int id)
        {
            var sql = @"SELECT    rr.id,
                                 rr.requestno,
                                 rr.requestfor,
	                             rr.requesttype,
								 tt.assettypename,
                                 rr.status,
	                             rr.empid,
							     rr.nameofteammember,
                                 rr.requesteddate,
                                 rr.description
					 FROM hrms.assetraiserequest as rr inner join hrms.assettype as tt
					 on rr.assettypeid=tt.id
                                 WHERE rr.id=@id
                                    ORDER BY rr.id";

            return await Connection.QueryAsync<AssetRaiseRequest>(sql, new { id });
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
    }
}
