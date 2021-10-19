using Chef.Common.Repositories;
using Chef.HRMS.Models;

namespace Chef.HRMS.Repositories
{
    public class BonusTypeRepository : GenericRepository<BonusType>, IBonusTypeRepository
    {
        public BonusTypeRepository(DbSession session) : base(session)
        {
        }
    }
}
