using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class PreviousEmploymentService : AsyncService, IPreviousEmploymentService
    {
        private readonly IPreviousEmploymentRepository previousEmploymentRepository;

        public PreviousEmploymentService(IPreviousEmploymentRepository previousEmploymentRepository)
        {
            this.previousEmploymentRepository = previousEmploymentRepository;
        }

        public Task<int> DeleteAsync(int id)
        {
            return previousEmploymentRepository.DeleteAsync(id);
        }

        public Task<IEnumerable<PreviousEmployment>> GetAllAsync()
        {
            return previousEmploymentRepository.GetAllAsync();
        }

        public Task<PreviousEmployment> GetAsync(int id)
        {
            return previousEmploymentRepository.GetAsync(id);
        }

        public Task<IEnumerable<PreviousEmploymentView>> GetByEmployeeId(int employeeId)
        {
            return previousEmploymentRepository.GetByEmployeeId(employeeId);
        }

        public Task<PreviousEmployment> InsertAsync(PreviousEmployment previousEmployment)
        {
            return previousEmploymentRepository.InsertAsync(previousEmployment);
        }

        public Task<int> UpdateAsync(PreviousEmployment previousEmployment)
        {
            return previousEmploymentRepository.UpdateAsync(previousEmployment);
        }
    }
}