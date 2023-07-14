using Chef.HRMS.Models.Loan;

namespace Chef.HRMS.Repositories.Loan;

public interface ILoanRequestDetailRepository : IGenericRepository<LoanRequestDetail>
{
    Task<IEnumerable<LoanRequestDetail>> GetLoanDetailsByLoanRequestId(int id);
}
