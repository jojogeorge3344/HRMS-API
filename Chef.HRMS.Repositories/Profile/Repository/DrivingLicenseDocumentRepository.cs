using Chef.Common.Repositories;
using Chef.HRMS.Models;

namespace Chef.HRMS.Repositories
{
    public class DrivingLicenseDocumentRepository : GenericRepository<DrivingLicenseDocument>, IDrivingLicenseDocumentRepository
    {
        public DrivingLicenseDocumentRepository(DbSession session) : base(session)
        {
        }
    }
}
