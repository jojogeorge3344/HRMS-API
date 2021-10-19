using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class BulkUploadRepository : GenericRepository<Leave>, IBulkUploadRepository
    {
        public BulkUploadRepository(DbSession session) : base(session)
        {
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


    }
}
