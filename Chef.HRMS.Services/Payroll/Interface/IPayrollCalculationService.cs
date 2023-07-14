using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IPayrollCalculationService : IAsyncService<PayrollCalculation>
{
    Task<IEnumerable<PayrollCalculationViewModel>> GetAllCalculationDetails();

    Task<IEnumerable<PayrollCalculationViewModel>> GetPayrollComponentsByEmployeeId(int employeeId);

    Task<IEnumerable<PayrollCalculation>> GetAllCalculationDetailsById(int id);
    Task<bool> IsSystemVariableExist(string code);
}