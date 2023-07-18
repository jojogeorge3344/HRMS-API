using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class ExpenseDocumentService : AsyncService<ExpenseDocument>, IExpenseDocumentService
{
    private readonly IExpenseDocumentRepository expenseDocumentRepository;

    public ExpenseDocumentService(IExpenseDocumentRepository ExpenseDocumentRepository)
    {
        this.expenseDocumentRepository = ExpenseDocumentRepository;
    }

    public async Task<ExpenseDocumentDetails> GetDocumentById(int expenseId)
    {
        return await expenseDocumentRepository.GetDocumentById(expenseId);
    } 
}
