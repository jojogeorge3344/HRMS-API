using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class PANDocumentService : AsyncService<PANDocument>, IPANDocumentService
{
    private readonly IPANDocumentRepository panDocumentRepository;

    public PANDocumentService(IPANDocumentRepository panDocumentRepository)
    {
        this.panDocumentRepository = panDocumentRepository;
    }
}
