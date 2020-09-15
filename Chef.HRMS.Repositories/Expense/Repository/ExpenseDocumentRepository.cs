using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class ExpenseDocumentRepository : GenericRepository<ExpenseDocument>, IExpenseDocumentRepository
    {
        public ExpenseDocumentRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<ExpenseDocumentDetails> GetDocumentById(int expenseId)
        {
            using (Connection)
            {
                var sql = @"SELECT A.id AS ExpenseDocumentId, 
                                   A.*, 
                                   B.* 
                            FROM   expensedocument A 
                                   INNER JOIN document B 
                                           ON A.documentid = B.id 
                            WHERE  A.expenseid = @expenseid";

                return await Connection.QueryFirstOrDefaultAsync<ExpenseDocumentDetails>(sql, new { expenseId });
            }
        }
    }
}
