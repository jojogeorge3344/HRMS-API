using Chef.HRMS.Models;

namespace Chef.HRMS.Repositories
{
    public interface IEmployeeEncashmentRepository : IGenericRepository<Chef.HRMS.Models.EmployeeEncashment>
    {
        Task<decimal> GetFinalLeaveBalance(DateTime fromDate, DateTime toDate, int employeeId); 
        Task<decimal> GetEOSBalanceDays(DateTime fromDate, DateTime toDate, int employeeId); 
        Task<decimal> GetFinalTicketAmountBalance(DateTime fromDate, DateTime toDate, int employeeId);
        Task<EmployeeEncashmentComponentView> GetEOSDetailsByEmployeeId(int employeeId);
        Task<EmployeeEncashmentComponentView> GetLeaveDetailsByEmployeeId(int employeeId);
        Task<EmployeeEncashmentComponentView> GetTicketDetailsByEmployeeId(int employeeId);
        Task<IEnumerable<Chef.HRMS.Models.EmployeeEncashment>> GetEmployeeEncashmentList();
        Task<int> UpadteEncashmentProcessStatus(int id, int approveStatus);
    }
}
