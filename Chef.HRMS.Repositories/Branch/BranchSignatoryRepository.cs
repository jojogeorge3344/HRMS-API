using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class BranchSignatoryRepository : GenericRepository<HRMSBranchSignatory>, IBranchSignatoryRepository
    {
        public BranchSignatoryRepository(DbSession session) : base(session)
        {
        }

        public async Task<IEnumerable<HRMSBranchSignatory>> GetAllByBranchAsync(int branchId)
        {

                var sql = "SELECT * FROM  hrmsbranchsignatory WHERE branchid = @branchid";
                return await Connection.QueryAsync<HRMSBranchSignatory>(sql, new { branchid = branchId });
        }
    }
}