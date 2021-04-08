using Chef.Common.Repositories;
using Chef.HRMS.Models;

namespace Chef.HRMS.Repositories
{
    public class JobDetailsRepository : GenericRepository<JobDetails>, IJobDetailsRepository
    {
        public JobDetailsRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

    }
}