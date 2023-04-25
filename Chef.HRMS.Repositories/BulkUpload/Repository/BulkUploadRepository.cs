using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using StackExchange.Redis;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class BulkUploadRepository : GenericRepository<Leave>, IBulkUploadRepository
    {
        public BulkUploadRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<int> RegularLoginBulkInsert(IEnumerable<RegularLogin> regularLogins)
        {
            var sql = new QueryBuilder<RegularLogin>().GenerateInsertQuery();
            sql = sql.Replace("RETURNING id", "");

            return await Connection.ExecuteAsync(sql, regularLogins);
        }

        public async Task<int> BulkInsertLeave(IEnumerable<Leave> leave)
        {
                var sql = new QueryBuilder<Leave>().GenerateInsertQuery();
                sql = sql.Replace("RETURNING id", "");

                return await Connection.ExecuteAsync(sql, leave);
        }

        public async Task<int> BulkInsertOnduty(IEnumerable<OnDuty> onDuty)
        {

                var sql = new QueryBuilder<OnDuty>().GenerateInsertQuery();
                sql = sql.Replace("RETURNING id", "");

                return await Connection.ExecuteAsync(sql, onDuty);
        }

        public async Task<int> BulkInsertRegularLogin(IEnumerable<RegularLogin> regularLogin)
        {

                var sql = new QueryBuilder<RegularLogin>().GenerateInsertQuery();
                sql = sql.Replace("RETURNING id", "");

                return await Connection.ExecuteAsync(sql, regularLogin);
        }

        public async Task<int> BulkInsertWorkFromHome(IEnumerable<WorkFromHome> workFromHome)
        {

                var sql = new QueryBuilder<WorkFromHome>().GenerateInsertQuery();
                sql = sql.Replace("RETURNING id", "");

                return await Connection.ExecuteAsync(sql, workFromHome);

        }

        public async Task<bool> GetEmployeeCodeExist(string employeeCode)
        {
            string sql = @"SELECT Count(1)
                         FROM hrms.jobdetails 
                         WHERE isarchived = false
                         AND employeenumber = @employeeCode;";
            if ((await Connection.QueryFirstOrDefaultAsync<int>(sql, new { employeeCode })) >= 1)
            {
                return true;
            }

            return false;
        }
    }
}
