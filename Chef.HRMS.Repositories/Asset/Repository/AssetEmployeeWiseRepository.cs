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
                        jt.firstname,
                        jt.lastname,
						allocatedasset,
                        requests,
                        jd.workertype
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

        public async Task<IEnumerable<AssetMyAsset>> GetAllocatedAssetById(int empid)
        {
            var sql = @"SELECT id,
                                empid,
                                assettype,
                                assetid,
                                assetname,
                                dateallocated AS allocatedon,
                                status 
                                FROM hrms.assetmyasset WHERE empid = @empid";
            return await Connection.QueryAsync<AssetMyAsset>(sql, new { empid });
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

        public async Task<IEnumerable<AssetEmployeeWiseRequest>> GetEmployeeRequestById(int empid)
        {

            var sql= @"SELECT rr.id AS assetraiserequestid,
                                    rr.requestno,
                                    rr.requestfor,
	                                rr.requesttype,
                                    rr.status,
                                    empid,
									firstname AS requestedby,
                                    rr.requesteddate AS requestedon
	                                    FROM hrms.assetraiserequest AS rr INNER JOIN hrms.employee ON rr.empid=employee.id
														WHERE empid=@empid";

            return await Connection.QueryAsync<AssetEmployeeWiseRequest>(sql, new { empid });

        }

        public async Task<int> UpdateStatus(int id, int status)
        {
            var sql = @"UPDATE hrms.assetraiserequest 
                                    SET status=@status WHERE id=@id";
            return await Connection.ExecuteAsync(sql, new { id, status });
        }
    }
}
