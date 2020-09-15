using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class ExpenseDocumentService : AsyncService, IExpenseDocumentService
    {
        private readonly IExpenseDocumentRepository expenseDocumentRepository;

        public ExpenseDocumentService(IExpenseDocumentRepository ExpenseDocumentRepository)
        {
            this.expenseDocumentRepository = ExpenseDocumentRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await expenseDocumentRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<ExpenseDocument>> GetAllAsync()
        {
            return await expenseDocumentRepository.GetAllAsync();
        }

        public async Task<ExpenseDocument> GetAsync(int id)
        {
            return await expenseDocumentRepository.GetAsync(id);
        }

        public async Task<ExpenseDocumentDetails> GetDocumentById(int expenseId)
        {
            return await expenseDocumentRepository.GetDocumentById(expenseId);
        }

        public async Task<ExpenseDocument> InsertAsync(ExpenseDocument expenseDocument)
        {
            return await expenseDocumentRepository.InsertAsync(expenseDocument);
        }

        public async Task<int> UpdateAsync(ExpenseDocument expenseDocument)
        {
            return await expenseDocumentRepository.UpdateAsync(expenseDocument);
        }
    }
}
