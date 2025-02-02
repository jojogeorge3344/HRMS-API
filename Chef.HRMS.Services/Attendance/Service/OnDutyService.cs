﻿using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class OnDutyService : IOnDutyService
{
    private readonly IOnDutyRepository onDutyRepository;

    public OnDutyService(IOnDutyRepository onDutyRepository)
    {
        this.onDutyRepository = onDutyRepository;
    }

    public async Task<int> DeleteAsync(int id)
    {
        return await onDutyRepository.DeleteAsync(id);
    }

    public async Task<IEnumerable<OnDuty>> GetAllAsync()
    {
        return await onDutyRepository.GetAllAsync();
    }

    public async Task<OnDuty> GetAsync(int id)
    {
        return await onDutyRepository.GetAsync(id);
    }

    public async Task<IEnumerable<JobDetails>> GetJoinDateByEmployeeId(int employeeId)
    {
        return await onDutyRepository.GetJoinDateByEmployeeId(employeeId);
    }

    public async Task<IEnumerable<OnDuty>> GetTotalRequestedDaysById(int employeeId)
    {
        return await onDutyRepository.GetTotalRequestedDaysById(employeeId);
    }

    public async Task<int> InsertAsync(OnDuty onDuty)
    {
        return await onDutyRepository.InsertAsync(onDuty);
    }

    public async Task<int> InsertNotifyPersonnel(IEnumerable<OnDutyNotifyPersonnel> onDutyNotifyPersonnel)
    {
        return await onDutyRepository.InsertNotifyPersonnel(onDutyNotifyPersonnel);
    }

    public async Task<int> UpdateAsync(OnDuty onDuty)
    {
        return await onDutyRepository.UpdateAsync(onDuty);
    }
}
