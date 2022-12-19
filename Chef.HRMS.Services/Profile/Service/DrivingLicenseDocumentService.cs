using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class DrivingLicenseDocumentService : AsyncService<DrivingLicenseDocument>, IDrivingLicenseDocumentService
    {
        private readonly IDrivingLicenseDocumentRepository drivingLicenseDocumentRepository;

        public DrivingLicenseDocumentService(IDrivingLicenseDocumentRepository drivingLicenseDocumentRepository)
        {
            this.drivingLicenseDocumentRepository = drivingLicenseDocumentRepository;
        }

        public Task<int> DeleteAsync(int id)
        {
            return drivingLicenseDocumentRepository.DeleteAsync(id);
        }

        public Task<IEnumerable<DrivingLicenseDocument>> GetAllAsync()
        {
            return drivingLicenseDocumentRepository.GetAllAsync();
        }

        public Task<DrivingLicenseDocument> GetAsync(int id)
        {
            return drivingLicenseDocumentRepository.GetAsync(id);
        }

        public Task<int> InsertAsync(DrivingLicenseDocument drivingLicenseDocument)
        {
            return drivingLicenseDocumentRepository.InsertAsync(drivingLicenseDocument);
        }

        public Task<int> UpdateAsync(DrivingLicenseDocument drivingLicenseDocument)
        {
            return drivingLicenseDocumentRepository.UpdateAsync(drivingLicenseDocument);
        }
    }
}
