using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class ExpensePaymentRepository : GenericRepository<ExpensePayment>, IExpensePaymentRepository
    {
        public ExpensePaymentRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<ExpensePayment>> GetAllApprovedExpense()
        {
            using (Connection)
            {
                var sql = @"SELECT e.*,epc.name as expensetypename,epc.expensetypeid as expensetypeid,
                                  e.id as expenserequestid 
                                      FROM  expense e 
                                      INNER JOIN expensepolicyconfiguration epc
                                      ON e.expenseconfigurationid=epc.id
                                      WHERE e.requeststatus=3 and e.ispaid=false";

                return await Connection.QueryAsync<ExpensePayment>(sql);
            }
        }

        public async Task<IEnumerable<ExpensePayment>> GetAllPaidOutExpense()
        {
            using (Connection)
            {
                var sql = @"SELECT e.*,et.name as expensetypename
                                      FROM  expensepayment e 
                                      INNER JOIN expensetype et
                                      ON e.expensetypeid=et.id
                                      WHERE e.ispaid=true";

                return await Connection.QueryAsync<ExpensePayment>(sql);
            }
        }

        public async Task<int> UpdateExpenseStatus(int expenseRequestId, int paymentMode)
        {
            using (Connection)
            {
                var sql = @"UPDATE public.expense
	                                      SET  ispaid=true, paymentmode=@paymentMode
	                                      WHERE id=@expenseRequestId";

                return await Connection.ExecuteAsync(sql,new { expenseRequestId , paymentMode });
            }
        }
    }
}
