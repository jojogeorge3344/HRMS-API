using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class PayrollCalculationService : AsyncService<PayrollCalculation>, IPayrollCalculationService
{
    private readonly IPayrollCalculationRepository payrollCalculationRepository;

    public PayrollCalculationService(IPayrollCalculationRepository payrollCalculationRepository)
    {
        this.payrollCalculationRepository = payrollCalculationRepository;
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

    public async Task<bool> IsSystemVariableExist(string code)
    {
        var result = await payrollCalculationRepository.IsSystemVariableExist(code);

        return result;
    }
}