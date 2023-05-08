 

namespace Chef.HRMS.Repositories
{
    public interface IEmployeeRevisionDetailsOldRepository : IGenericRepository<EmployeeRevisionDetailsOld>
    {
        Task<IEnumerable<EmployeeRevisionDetailsOld>> GetOldEmployeeRevisionSalaryDetail(int employeeRevisionId);
    }
}