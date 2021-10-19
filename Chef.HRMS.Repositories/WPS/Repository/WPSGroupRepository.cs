using Chef.Common.Repositories;
using Chef.HRMS.Models;

namespace Chef.HRMS.Repositories
{
    public class WPSGroupRepository : GenericRepository<WPSGroup>, IWPSGroupRepository
    {
        public WPSGroupRepository(DbSession session) : base(session)
        {
        }


    }
}
