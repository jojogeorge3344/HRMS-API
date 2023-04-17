using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Document = Chef.HRMS.Models.Document;

namespace Chef.HRMS.Repositories
{
    public interface IDocumentRepository : IGenericRepository<Document>
    {
    }
}