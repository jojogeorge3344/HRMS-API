 

namespace Chef.HRMS.Repositories
{
    public interface IEmployeeRevisionDetailsRepository : IGenericRepository<EmployeeRevisionDetails>
    {
        Task<IEnumerable<EmployeeRevisionSalaryView>> GetEmployeeRevisionSalaryDetails(int payrollStructureId,int employee);

    }
}