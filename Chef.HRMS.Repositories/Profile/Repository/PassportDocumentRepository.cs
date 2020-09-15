using Chef.Common.Repositories;
using Chef.HRMS.Models;

namespace Chef.HRMS.Repositories
{
    public class PassportDocumentRepository : GenericRepository<PassportDocument>, IPassportDocumentRepository
    {
        public PassportDocumentRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }
    }
}
