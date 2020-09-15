using Chef.Common.Repositories;
using Chef.HRMS.Models;

namespace Chef.HRMS.Repositories
{
    public class LOPCalculationRepository : GenericRepository<LOPCalculation>, ILOPCalculationRepository
    {
        public LOPCalculationRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }
    }
}