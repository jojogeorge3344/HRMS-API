using Chef.HRMS.Models.Loan;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories.Loan
{
    public interface ILoanRequestDetailRepository : IGenericRepository<LoanRequestDetail>
    {
        Task<IEnumerable<LoanRequestDetail>> GetLoanDetailsByLoanRequestId(int id);
    }
}
