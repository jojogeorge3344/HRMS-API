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
        public async Task<IEnumerable<AssetRaiseRequest>> GetAllRaiseRequestList(int empid)
        {

            var sql ="select id,assettypeid, requestno,requesteddate,requestfor,requesttype,status from hrms.assetraiserequest where empid=@empid";

            return await Connection.QueryAsync<AssetRaiseRequest>(sql, new { empid });
        }

        public async Task<IEnumerable<AssetRaiseRequest>> Get(int id)
        {

            var sql = "SELECT * FROM  hrms.assetraiserequest WHERE id = @id";

            return await Connection.QueryAsync<AssetRaiseRequest>(sql, new { id });
        }

        public async Task<IEnumerable<AssetEmployeeViewModel>> GetEmployeeDetails()
        {
            var sql = @"select concat(firstname,'-',jd.employeenumber) as employee,
                        firstname,
                        jd.employeenumber,
                        jd.employeeid as empid,
                        jd.department 
                        from hrms.jobdetails as jd 
                        inner join hrms.employee
                        on jd.employeeid = hrms.employee.id";
            return await Connection.QueryAsync<AssetEmployeeViewModel>(sql, new { });
        }


        //public async Task<IEnumerable<AssetRaiseRequest>> GetEmployeeDepartmentDetails(int id)
        //{
        //    var sql = @"select concat(firstname,'-',jd.employeenumber) as nameofteammember, 
        //                        jd.employeeid as empid , 
        //                        jd.employeenumber,
        //                        firstname,
        //                        jd.department 
        //                        from hrms.jobdetails as jd inner join hrms.employee 
        //                        on jd.employeeid=hrms.employee.id where jd.employeeid=@id";
        //    return await Connection.QueryAsync<AssetRaiseRequest>(sql, new { id });
        //}
    }
}
