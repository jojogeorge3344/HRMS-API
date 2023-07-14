namespace Chef.HRMS.Repositories;

public class DrivingLicenseDocumentRepository : GenericRepository<DrivingLicenseDocument>, IDrivingLicenseDocumentRepository
{
    public DrivingLicenseDocumentRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }
}
