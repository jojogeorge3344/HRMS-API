﻿using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class JobDetailsService : AsyncService<JobDetails>, IJobDetailsService
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

    public async Task<IEnumerable<GroupCategory>> GetGroupCategory()
    {
        return await jobDetailsRepository.GetGroupCategory();
    }

    public async Task<IEnumerable<EmployeeDefaults>> GetProbationDetails()
    {
        return await jobDetailsRepository.GetProbationDetails();
    }

    public async Task<int> InsertAsync(JobDetails jobDetails)
    {
        return await jobDetailsRepository.InsertAsync(jobDetails);
    }

    public async Task<int> UpdateAsync(JobDetails jobDetails)
    {
        return await jobDetailsRepository.UpdateAsync(jobDetails);
    }
}