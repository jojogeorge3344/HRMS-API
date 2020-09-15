using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class ExpensePolicyRepository : GenericRepository<ExpensePolicy>, IExpensePolicyRepository
    {
        public ExpensePolicyRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<int>> GetAllAssignedExpensePolicy()
        {
            using (Connection)
            {
                var sql = @"SELECT DISTINCT expensepolicyid 
                                    FROM PUBLIC.jobfiling
                                    ORDER  BY expensepolicyid ASC";

                return await Connection.QueryAsync<int>(sql);
            }
        }

        public async Task<IEnumerable<ExpensePolicy>> GetAllConfiguredExpensePolicies()
        {
            using (Connection)
            {
                var sql = @"SELECT * 
                                    FROM PUBLIC.expensepolicy
                                    WHERE isconfigured=true";

                return await Connection.QueryAsync<ExpensePolicy>(sql);
            }
        }

        public async Task<bool> UpdateExpensePolicy(int id,bool isConfigured)
        {
            using (Connection)
            {
                var sql = @"UPDATE PUBLIC.expensepolicy
                                   SET isconfigured=@isConfigured
                                    WHERE id=@id";

                var result= await Connection.ExecuteAsync(sql, new { id, isConfigured });
                if(result==1)
                {
                    return true;

                }
                else
                {
                    return false;
                }
            }
        }
    }
}
