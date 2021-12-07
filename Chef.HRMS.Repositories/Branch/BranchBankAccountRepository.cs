using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class BranchBankAccountRepository : GenericRepository<HRMSBranchBankAccount>, IBranchBankAccountRepository
    {
        public BranchBankAccountRepository(IHttpContextAccessor httpContextAccessor, DbSession session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<HRMSBranchBankAccount>> GetAllByBranchAsync(int branchId)
        {

                var sql = "SELECT * FROM  hrms.hrmsbranchbankaccount WHERE branchid = @Id";
                return await Connection.QueryAsync<HRMSBranchBankAccount>(sql, new { Id = branchId });
        }
    }
}