using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class ExpenseDocumentRepository : GenericRepository<ExpenseDocument>, IExpenseDocumentRepository
    {
        public ExpenseDocumentRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<ExpenseDocumentDetails> GetDocumentById(int expenseId)
        {

                var sql = @"SELECT A.id AS ExpenseDocumentId, 
                                   A.*, 
                                   B.* 
                            FROM   hrms.expensedocument A 
                                   INNER JOIN hrms.document B 
                                           ON A.documentid = B.id 
                            WHERE  A.documentid = @expenseid";

                return await Connection.QueryFirstOrDefaultAsync<ExpenseDocumentDetails>(sql, new { expenseId });
        }
    }
}
