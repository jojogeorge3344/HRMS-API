using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class BranchBankAccountRepository : GenericRepository<HRMSBranchBankAccount>, IBranchBankAccountRepository
    {
        public BranchBankAccountRepository(DbSession session) : base(session)
        {
        }

        public async Task<IEnumerable<HRMSBranchBankAccount>> GetAllByBranchAsync(int branchId)
        {

                var sql = "SELECT * FROM  hrmsbranchbankaccount WHERE branchid = @Id";
                return await Connection.QueryAsync<HRMSBranchBankAccount>(sql, new { Id = branchId });
        }
    }
}