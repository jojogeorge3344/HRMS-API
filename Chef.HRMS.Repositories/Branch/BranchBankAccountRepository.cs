using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class BranchBankAccountRepository : GenericRepository<HRMSBranchBankAccount>, IBranchBankAccountRepository
    {
        public BranchBankAccountRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<HRMSBranchBankAccount>> GetAllByBranchAsync(int branchId)
        {
            using (Connection)
            {
                var sql = "SELECT * FROM  hrmsbranchbankaccount WHERE branchid = @Id";
                return await Connection.QueryAsync<HRMSBranchBankAccount>(sql, new { Id = branchId });
            }
        }
    }
}