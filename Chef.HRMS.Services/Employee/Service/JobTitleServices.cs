﻿using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class JobTitleServices : AsyncService, IJobTitleServices
    {
        private readonly IJobTitleRepository jobTitleRepository;

        public JobTitleServices(IJobTitleRepository jobTitleRepository)
        {
            this.jobTitleRepository = jobTitleRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await jobTitleRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<JobTitle>> GetAllAsync()
        {
            return await jobTitleRepository.GetAllAsync();
        }

        public async Task<JobTitle> GetAsync(int id)
        {
            return await jobTitleRepository.GetAsync(id);
        }

       
        public async Task<JobTitle> InsertAsync(JobTitle jobTitle)
        {
            return await jobTitleRepository.InsertAsync(jobTitle);
        }

        public async Task<int> UpdateAsync(JobTitle jobTitle)
        {
            return await jobTitleRepository.UpdateAsync(jobTitle);
        }

        public async Task<IEnumerable<JobTitleView>> GetAllJobTitleList()
        {
            return await jobTitleRepository.GetAllJobTitleList();
        }
    }
}