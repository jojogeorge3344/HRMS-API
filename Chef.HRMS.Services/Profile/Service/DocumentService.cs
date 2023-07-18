using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class DocumentService : AsyncService<Document>, IDocumentService
{
    private readonly IDocumentRepository documentRepository;

    public DocumentService(IDocumentRepository documentRepository)
    {
        this.documentRepository = documentRepository;
    }
}