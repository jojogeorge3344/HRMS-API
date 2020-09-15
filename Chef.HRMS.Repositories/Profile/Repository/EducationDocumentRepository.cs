using Chef.Common.Repositories;
using Chef.HRMS.Models;

namespace Chef.HRMS.Repositories
{
    public class EducationDocumentRepository : GenericRepository<EducationDocument>, IEducationDocumentRepository
    {
        public EducationDocumentRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }
    }
}