namespace Chef.HRMS.Repositories;

public interface IPayrollComponentRepository : IGenericRepository<PayrollComponent>
{
    Task<IEnumerable<int>> GetAllAssignedPayrollComponents();
    Task<IEnumerable<PayrollComponent>> GetAllPayrollComponentByType(int payrollComponentType);
    Task<IEnumerable<PayrollComponent>> GetAllOrderByPayrollComponent();
    Task<IEnumerable<BenefitTypes>> GetComponentType();
    Task<bool> IsPayrollComponentCodeExist(string code);

}