using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IExpenseDocumentRepository : IGenericRepository<ExpenseDocument>
    {

        Task<ExpenseDocumentDetails> GetDocumentById(int expenseId);
    }
}
