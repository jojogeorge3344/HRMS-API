 

namespace Chef.HRMS.Repositories
{
    public interface IEmployeeRevisionRepository : IGenericRepository<EmployeeRevision>
    {
        Task<EmployeeRevisionView> GetEmployeeDetail(int employeeId);
        Task<IEnumerable<EmployeeRevisionStructureView>> GetPayrollComponent(int payrollStructureId);
        Task<int> UpdateEmployeeRevisionStatus(int employeeRevisionid);
    }
}