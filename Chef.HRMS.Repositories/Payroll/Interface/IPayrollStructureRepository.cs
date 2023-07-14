namespace Chef.HRMS.Repositories;

public interface IPayrollStructureRepository : IGenericRepository<PayrollStructure>
{
    Task<IEnumerable<int>> GetAllAssignedPayrollStructure();
    Task<IEnumerable<PayrollStructure>> GetAllConfiguredPayrollStructures();
    Task<int> UpdatePayrollStructure(int id, bool isConfigured);
    Task<IEnumerable<SystemVariable>> GetAllActived(int payrollstructureid);

}