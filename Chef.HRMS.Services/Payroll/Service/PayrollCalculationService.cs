﻿using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class PayrollCalculationService : AsyncService<PayrollCalculation>, IPayrollCalculationService
{
    private readonly IPayrollCalculationRepository payrollCalculationRepository;

    public PayrollCalculationService(IPayrollCalculationRepository payrollCalculationRepository)
    {
        this.payrollCalculationRepository = payrollCalculationRepository;
    }

    public async Task<int> DeleteAsync(int id)
    {
        return await payrollCalculationRepository.DeleteAsync(id);
    }

    public async Task<IEnumerable<PayrollCalculation>> GetAllAsync()
    {
        return await payrollCalculationRepository.GetAllAsync();
    }

    public async Task<IEnumerable<PayrollCalculationViewModel>> GetAllCalculationDetails()
    {
        return await payrollCalculationRepository.GetAllCalculationDetails();
    }

    public async Task<IEnumerable<PayrollCalculationViewModel>> GetPayrollComponentsByEmployeeId(int employeeId)
    {
        return await payrollCalculationRepository.GetPayrollComponentsByEmployeeId(employeeId);
    }

    public async Task<IEnumerable<PayrollCalculation>> GetAllCalculationDetailsById(int id)
    {
        return await payrollCalculationRepository.GetAllCalculationDetailsById(id);
    }

    public async Task<PayrollCalculation> GetAsync(int id)
    {
        return await payrollCalculationRepository.GetAsync(id);
    }

    public async Task<int> InsertAsync(PayrollCalculation payrollCalculation)
    {
        return await payrollCalculationRepository.InsertAsync(payrollCalculation);
    }

    public async Task<int> UpdateAsync(PayrollCalculation payrollCalculation)
    {
        return await payrollCalculationRepository.UpdateAsync(payrollCalculation);
    }

    public async Task<bool> IsSystemVariableExist(string code)
    {
        var result = await payrollCalculationRepository.IsSystemVariableExist(code);

        return result;
    }
}