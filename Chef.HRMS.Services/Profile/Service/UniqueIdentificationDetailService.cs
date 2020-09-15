using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class UniqueIdentificationDetailService : AsyncService, IUniqueIdentificationDetailService
    {
        private readonly IUniqueIdentificationDetailRepository uniqueIdentificationDetailRepository;

        public UniqueIdentificationDetailService(IUniqueIdentificationDetailRepository uniqueIdentificationDetailRepository)
        {
            this.uniqueIdentificationDetailRepository = uniqueIdentificationDetailRepository;
        }

        public Task<int> DeleteAsync(int id)
        {
            return uniqueIdentificationDetailRepository.DeleteAsync(id);
        }

        public Task<IEnumerable<UniqueIdentificationDetail>> GetAllAsync()
        {
            return uniqueIdentificationDetailRepository.GetAllAsync();
        }

        public Task<UniqueIdentificationDetail> GetAsync(int id)
        {
            return uniqueIdentificationDetailRepository.GetAsync(id);
        }

        public Task<IEnumerable<UniqueIdentificationDetailView>> GetByEmployeeId(int employeeId)
        {
            return uniqueIdentificationDetailRepository.GetByEmployeeId(employeeId);
        }

        public Task<UniqueIdentificationDetail> InsertAsync(UniqueIdentificationDetail uniqueIdentificationDetail)
        {
            return uniqueIdentificationDetailRepository.InsertAsync(uniqueIdentificationDetail);
        }

        public Task<int> UpdateAsync(UniqueIdentificationDetail uniqueIdentificationDetail)
        {
            return uniqueIdentificationDetailRepository.UpdateAsync(uniqueIdentificationDetail);
        }
    }
}