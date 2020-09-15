﻿using Chef.Common.Services;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
   public interface IExpenseDocumentService : IAsyncService<ExpenseDocument>
    {
        Task<ExpenseDocumentDetails> GetDocumentById(int expenseId);
    }
}
