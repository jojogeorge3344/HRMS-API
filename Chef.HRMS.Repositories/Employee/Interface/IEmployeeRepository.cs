 

namespace Chef.HRMS.Repositories
{
    public interface IEmployeeRepository : IGenericRepository<HRMSEmployee>
    {
        Task<IEnumerable<EmployeeView>> GetAllEmployeeDetails();
        Task<EmployeeView> GetEmployeeDetailsById(int employeeId);

        Task<IEnumerable<EmployeeView>> GetEmployeeDetailsByJobTile(int jobTitleId);
        Task<IEnumerable<Notification>> GetAllNotificationById(int employeeId);
    }
}