using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class PreviousEmploymentDocumentService : AsyncService<PreviousEmploymentDocument>, IPreviousEmploymentDocumentService
{
    private readonly IPreviousEmploymentDocumentRepository previousEmploymentDocumentRepository;

    public PreviousEmploymentDocumentService(IPreviousEmploymentDocumentRepository previousEmploymentDocumentRepository)
    {
        this.previousEmploymentDocumentRepository = previousEmploymentDocumentRepository;
    }
}