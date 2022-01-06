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

        public async Task<IEnumerable<AssetEmployeeWiseRequest>> GetEmployeeRequestById(int employeeid)
        {
            var sql = @"select employeeid,requestno,requestedon,requestedby,requestfor,requesttype,status from hrms.assetemployeewiserequest
                            where employeeid=@employeeid";
            return await Connection.QueryAsync<AssetEmployeeWiseRequest>(sql, new { employeeid });

        }
    }
}
