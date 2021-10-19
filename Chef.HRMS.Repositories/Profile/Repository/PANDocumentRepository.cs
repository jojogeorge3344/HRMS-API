using Chef.Common.Repositories;
using Chef.HRMS.Models;

namespace Chef.HRMS.Repositories
{
    public class PANDocumentRepository : GenericRepository<PANDocument>, IPANDocumentRepository
    {
        public PANDocumentRepository(DbSession session) : base(session)
        {
        }
    }
}
