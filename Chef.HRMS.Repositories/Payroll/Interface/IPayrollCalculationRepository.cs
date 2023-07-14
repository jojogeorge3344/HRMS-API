namespace Chef.HRMS.Repositories;

public interface IPayrollCalculationRepository : IGenericRepository<PayrollCalculation>
{
    Task<IEnumerable<PayrollCalculationViewModel>> GetAllCalculationDetails();

    Task<IEnumerable<PayrollCalculationViewModel>> GetPayrollComponentsByEmployeeId(int employeeId);

    Task<IEnumerable<PayrollCalculation>> GetAllCalculationDetailsById(int id);
    Task<bool> IsSystemVariableExist(string code);
}