using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class EducationService : AsyncService<Education>, IEducationService
    {
        private readonly IEducationRepository educationRepository;

        public EducationService(IEducationRepository educationRepository)
        {
            this.educationRepository = educationRepository;
        }

        public Task<int> DeleteAsync(int id)
        {
            return educationRepository.DeleteAsync(id);
        }

        public Task<IEnumerable<Education>> GetAllAsync()
        {
            return educationRepository.GetAllAsync();
        }

        public Task<IEnumerable<EducationView>> GetAllByEmployeeId(int employeeId)
        {
            return educationRepository.GetAllByEmployeeId(employeeId);
        }

        public Task<Education> GetAsync(int id)
        {
            return educationRepository.GetAsync(id);
        }

        public Task<int> InsertAsync(Education education)
        {
            return educationRepository.InsertAsync(education);
        }

        public Task<int> UpdateAsync(Education education)
        {
            return educationRepository.UpdateAsync(education);
        }
    }
}