using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IExpenseDocumentService : IAsyncService<ExpenseDocument>
    {
        Task<ExpenseDocumentDetails> GetDocumentById(int expenseId);
    }
}
