using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class DrivingLicenseDocumentService : AsyncService<DrivingLicenseDocument>, IDrivingLicenseDocumentService
{
    private readonly IDrivingLicenseDocumentRepository drivingLicenseDocumentRepository;

    public DrivingLicenseDocumentService(IDrivingLicenseDocumentRepository drivingLicenseDocumentRepository)
    {
        this.drivingLicenseDocumentRepository = drivingLicenseDocumentRepository;
    }
}
