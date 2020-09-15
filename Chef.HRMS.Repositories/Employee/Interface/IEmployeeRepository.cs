using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IEmployeeRepository : IGenericRepository<Employee>
    {
        Task<IEnumerable<EmployeeView>> GetAllEmployeeDetails();
        Task<EmployeeView> GetEmployeeDetailsById(int employeeId);

        Task<IEnumerable<EmployeeView>> GetEmployeeDetailsByJobTile(int jobTitleId);
        Task<IEnumerable<Notification>> GetAllNotificationById(int employeeId);
    }
}