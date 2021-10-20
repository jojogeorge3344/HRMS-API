using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class LOPTrackerRepository : GenericRepository<LOPTracker>, ILOPTrackerRepository
    {
        public LOPTrackerRepository(DbSession session) : base(session)
        {
        }

        public async Task<LossOfPayView> GetLossOfPayDeductionByEmployee(int employeeId, int payrollProcessingMethodId)
        {
            using (Connection)
            {
                var sql = @"SELECT * from hrms.calculate_LOP(@employeeId,@payrollProcessingMethodId) ";

                return await Connection.QueryFirstOrDefaultAsync<LossOfPayView>(sql, new { employeeId, payrollProcessingMethodId });
            }
        }
    }
}