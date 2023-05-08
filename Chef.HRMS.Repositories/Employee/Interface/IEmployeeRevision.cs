

namespace Chef.HRMS.Repositories
{
    public interface IEmployeeRevisionRepository : IGenericRepository<EmployeeRevision>
    {
        Task<EmployeeRevisionOld> GetEmployeeDetail(int employeeId);
        Task<IEnumerable<EmployeeRevisionStructureView>> GetPayrollComponent(int payrollStructureId);
        Task<int> UpdateEmployeeRevisionStatus(int employeeRevisionid,int status);
        Task<bool> IsEmployeeRevisionApproved(int employeeRevisionId);
    }
}