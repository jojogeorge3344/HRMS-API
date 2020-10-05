﻿using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class JobDetailsService : AsyncService, IJobDetailsService
    {
        private readonly IJobDetailsRepository jobDetailsRepository;

        public JobDetailsService(IJobDetailsRepository jobDetailsRepository)
        {
            this.jobDetailsRepository = jobDetailsRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await jobDetailsRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<JobDetails>> GetAllAsync()
        {
            return await jobDetailsRepository.GetAllAsync();
        }

        public async Task<JobDetails> GetAsync(int id)
        {
            return await jobDetailsRepository.GetAsync(id);
        }

        public async Task<JobDetails> InsertAsync(JobDetails jobDetails)
        {
            return await jobDetailsRepository.InsertAsync(jobDetails);
        }

        public async Task<int> UpdateAsync(JobDetails jobDetails)
        {
            return await jobDetailsRepository.UpdateAsync(jobDetails);
        }
    }
}