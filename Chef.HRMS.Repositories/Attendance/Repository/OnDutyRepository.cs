using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class OnDutyRepository : GenericRepository<OnDuty>, IOnDutyRepository
    {
        public OnDutyRepository(DbSession session) : base(session)
        {
        }

        public async Task<IEnumerable<OnDuty>> GetTotalRequestedDaysById(int employeeId)
        {
                var sql = "SELECT * FROM hrms.onduty WHERE employeeid=@employeeId";

                return await Connection.QueryAsync<OnDuty>(sql, new { employeeId });
        }

        public async Task<int> InsertNotifyPersonnel(IEnumerable<OnDutyNotifyPersonnel> OnDutyNotifyPersonnel)
        {

                var sql = new QueryBuilder<OnDutyNotifyPersonnel>().GenerateInsertQuery();
                sql = sql.Replace("RETURNING id", "");

                return await Connection.ExecuteAsync(sql, OnDutyNotifyPersonnel);
        }
    }
}
