using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IEmployeeService : IAsyncService<HRMSEmployee>
    {
        Task<IEnumerable<EmployeeView>> GetAllEmployeeDetails();
        Task<EmployeeView> GetEmployeeDetailsById(int employeeId, int leaveId);
        Task<IEnumerable<EmployeeView>> GetEmployeeDetailsByJobTile(int jobTitleId);
        Task<IEnumerable<Notification>> GetAllNotificationById(int employeeId);
        Task<bool> IsNameExist(string name);
        Task<LoginEmployeeView> GetLoginEmployee(int employeeId);
    }
}