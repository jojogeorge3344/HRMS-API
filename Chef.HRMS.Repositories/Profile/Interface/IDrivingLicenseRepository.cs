namespace Chef.HRMS.Repositories;

public interface IDrivingLicenseRepository : IGenericRepository<DrivingLicense>
{
    Task<IEnumerable<DrivingLicenseView>> GetByEmployeeId(int employeeId);
}