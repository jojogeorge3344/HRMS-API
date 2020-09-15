using Chef.Common.Repositories;
using Chef.HRMS.Models;

namespace Chef.HRMS.Repositories
{
    public class PreviousEmploymentDocumentRepository : GenericRepository<PreviousEmploymentDocument>, IPreviousEmploymentDocumentRepository
    {
        public PreviousEmploymentDocumentRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }
    }
}