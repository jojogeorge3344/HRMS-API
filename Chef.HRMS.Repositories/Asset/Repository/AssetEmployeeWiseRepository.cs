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
            var sql = @"SELECT  jt.id ,
                                jk.employeeid,
                                jt.firstname,
                                jt.lastname,
						        jk.allocatedasset,
                                jk.requests,
                                jd.workertype           AS employeestatus
                        FROM hrms.employee AS jt
                        INNER JOIN hrms.assetemployeewise AS jk 
							   ON jt.id = jk.employeeid
                        INNER JOIN hrms.jobdetails AS jd 
							   ON jt.id = jd.employeeid";

            return await Connection.QueryAsync<AssetEmployeeWise>(sql);
        }

        public async Task<IEnumerable<AssetAllocated>> GetAllocatedAssetById(int empid)
        {
            var sql = @"SELECT al.id,
                                al.empid,
                                tt.assettypename,
                                al.assetid,
                                al.assetname,
                                al.allocateddate AS allocatedon,
                                al.status 
                        FROM hrms.assetallocated as al inner join hrms.assettype as tt 
						on al.assettypeid =tt.id WHERE empid = @empid";

            return await Connection.QueryAsync<AssetAllocated>(sql, new { empid });
        }

        public async Task<IEnumerable<AssetEmployeeWise>> GetEmployeeDetailsById(int employeeid)
        {
            var sql = @"SELECT  employeeid,
                                firstname,
                                jd.workertype       AS employeestatus,
                                jd.jobtitleid       AS designation
                        FROM    hrms.employee 
                                INNER JOIN hrms.jobdetails AS jd 
                                ON hrms.employee.id=jd.employeeid 
                        WHERE employeeid=@employeeid";

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
                                 requesteddate      AS requestedon
					 FROM hrms.assetraiserequest 
                                 WHERE empid=@empid";

            return await Connection.QueryAsync<AssetRaiseRequest>(sql, new { empid=empid });

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
