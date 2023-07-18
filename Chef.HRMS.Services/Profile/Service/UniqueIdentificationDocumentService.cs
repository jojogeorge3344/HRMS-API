using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class UniqueIdentificationDocumentService : AsyncService<UniqueIdentificationDocument>, IUniqueIdentificationDocumentService
{
    private readonly IUniqueIdentificationDocumentRepository uniqueIdentificationDocumentRepository;

    public UniqueIdentificationDocumentService(IUniqueIdentificationDocumentRepository uniqueIdentificationDocumentRepository)
    {
        this.uniqueIdentificationDocumentRepository = uniqueIdentificationDocumentRepository;
    }
}
