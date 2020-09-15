using Chef.Common.Repositories;
using Chef.HRMS.Models;

namespace Chef.HRMS.Repositories
{
    public class BranchRepository : GenericRepository<HRMSBranch>, IBranchRepository
    {
        public BranchRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }
    }
}