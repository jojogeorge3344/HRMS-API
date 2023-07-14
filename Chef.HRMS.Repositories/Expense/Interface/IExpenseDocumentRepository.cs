namespace Chef.HRMS.Repositories;

public interface IExpenseDocumentRepository : IGenericRepository<ExpenseDocument>
{

    Task<ExpenseDocumentDetails> GetDocumentById(int expenseId);
}
