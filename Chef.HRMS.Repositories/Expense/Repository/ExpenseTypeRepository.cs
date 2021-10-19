using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class ExpenseTypeRepository : GenericRepository<ExpenseType>, IExpenseTypeRepository
    {
        public ExpenseTypeRepository(DbSession session) : base(session)
        {
        }
        public async Task<IEnumerable<int>> GetAllAssignedExpenseTypes()
        {

                var sql = @"SELECT DISTINCT expensetypeid 
                                    FROM PUBLIC.expensepolicyconfiguration
                                    ORDER  BY expensetypeid ASC";

                return await Connection.QueryAsync<int>(sql);
        }
        public async Task<IEnumerable<ExpenseType>> GetAllByExpensePolicyId(int policyId)
        {

                var sql = @"SELECT A.* 
                            FROM   expensetype A 
                                   INNER JOIN expensepolicyexpensetype B 
                                           ON A.id = B.expensetypeid 
                            WHERE  B.expensepolicyid = @policyId
                                   ORDER  BY B.id ASC";

                return await Connection.QueryAsync<ExpenseType>(sql, new { policyId });

        }

        public async Task<IEnumerable<ExpenseType>> GetAllByExpenseCategory(int expenseCategoryId)
        {

                var sql = "SELECT * FROM  ExpenseType where Category=@expenseCategoryId  ORDER  BY id ASC";

                return await Connection.QueryAsync<ExpenseType>(sql, new { expenseCategoryId });

        }
    }
}

