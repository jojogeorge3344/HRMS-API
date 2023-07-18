using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class PassportDocumentService : AsyncService<PassportDocument>, IPassportDocumentService
{
    private readonly IPassportDocumentRepository passportDocumentRepository;

    public PassportDocumentService(IPassportDocumentRepository passportDocumentRepository)
    {
        this.passportDocumentRepository = passportDocumentRepository;
    }
}
