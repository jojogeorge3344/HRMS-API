using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class EducationDocumentService : AsyncService<EducationDocument>, IEducationDocumentService
{
    private readonly IEducationDocumentRepository educationDocumentRepository;

    public EducationDocumentService(IEducationDocumentRepository educationDocumentRepository)
    {
        this.educationDocumentRepository = educationDocumentRepository;
    }
}