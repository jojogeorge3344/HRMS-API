﻿using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class PayrollSystemVariableService : AsyncService<PayrollSystemVariable>, IPayrollSystemVariableService
{
    private readonly IPayrollSystemVariableRepository payrollSystemVariableRepository;

    public PayrollSystemVariableService(IPayrollSystemVariableRepository payrollSystemVariableRepository)
    {
        this.payrollSystemVariableRepository = payrollSystemVariableRepository;
    }

    public async Task<int> DeleteAsync(int id)
    {
        return await payrollSystemVariableRepository.DeleteAsync(id);
    }

    public async Task<IEnumerable<PayrollSystemVariable>> GetAllAsync()
    {
        return await payrollSystemVariableRepository.GetAllAsync();
    }

    public async Task<PayrollSystemVariable> GetAsync(int id)
    {
        return await payrollSystemVariableRepository.GetAsync(id);
    }

    public async Task<int> InsertAsync(PayrollSystemVariable payrollSystemVariable)
    {
        return await payrollSystemVariableRepository.InsertAsync(payrollSystemVariable);
    }

    public async Task<int> UpdateAsync(PayrollSystemVariable payrollSystemVariable)
    {
        return await payrollSystemVariableRepository.UpdateAsync(payrollSystemVariable);
    }
}
