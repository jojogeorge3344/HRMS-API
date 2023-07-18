using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class DrivingLicenseService : AsyncService<DrivingLicense>, IDrivingLicenseService
{
    private readonly IDrivingLicenseRepository drivingLicenseRepository;

    public DrivingLicenseService(IDrivingLicenseRepository drivingLicenseRepository)
    {
        this.drivingLicenseRepository = drivingLicenseRepository;
    }

    public Task<IEnumerable<DrivingLicenseView>> GetByEmployeeId(int employeeId)
    {
        return drivingLicenseRepository.GetByEmployeeId(employeeId);
    } 
}