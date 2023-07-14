using Chef.Common.Core.Extensions;
using Chef.HRMS.Models.Loan;

namespace Chef.HRMS.Repositories.Loan;

public class LoanRequestDetailRepository : GenericRepository<LoanRequestDetail>, ILoanRequestDetailRepository
{
    public LoanRequestDetailRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {

    }

    public async Task<IEnumerable<LoanRequestDetail>> GetLoanDetailsByLoanRequestId(int id)
    {
        return await QueryFactory
        .Query<LoanRequestDetail>()
        .Where("loanrequestid", id)
        .WhereNotArchived()
        .GetAsync<LoanRequestDetail>();
    }
}
