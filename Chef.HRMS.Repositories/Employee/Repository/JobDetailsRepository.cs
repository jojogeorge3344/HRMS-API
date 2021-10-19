using Chef.Common.Repositories;
using Chef.HRMS.Models;

namespace Chef.HRMS.Repositories
{
    public class JobDetailsRepository : GenericRepository<JobDetails>, IJobDetailsRepository
    {
        public JobDetailsRepository(DbSession session) : base(session)
        {
        }

    }
}