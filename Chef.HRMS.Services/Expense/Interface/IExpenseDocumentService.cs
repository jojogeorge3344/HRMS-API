using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IExpenseDocumentService : IAsyncService<ExpenseDocument>
{
    Task<ExpenseDocumentDetails> GetDocumentById(int expenseId);
}
