using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class JobFilingService : AsyncService<JobFiling>, IJobFilingService
    {
        private readonly IJobFilingRepository jobFilingRepository;

        public JobFilingService(IJobFilingRepository jobFilingRepository)
        {
            this.jobFilingRepository = jobFilingRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await jobFilingRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<JobFiling>> GetAllAsync()
        {
            return await jobFilingRepository.GetAllAsync();
        }

        public async Task<JobFiling> GetAsync(int id)
        {
            return await jobFilingRepository.GetAsync(id);
        }

        public async Task<int> GetWeekendPolicyById(int employeeId)
        {
            return await jobFilingRepository.GetWeekendPolicyById(employeeId);
        }

        public async Task<int> InsertAsync(JobFiling jobFiling)
        {
            return await jobFilingRepository.InsertAsync(jobFiling);
        }

        public async Task<int> UpdateAsync(JobFiling jobFiling)
        {
            return await jobFilingRepository.UpdateAsync(jobFiling);
        }
    }
}