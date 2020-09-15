using Chef.Common.Repositories;
using Chef.HRMS.Models;

namespace Chef.HRMS.Repositories
{
    public class BonusTypeRepository : GenericRepository<BonusType>, IBonusTypeRepository
    {
        public BonusTypeRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }
    }
}
