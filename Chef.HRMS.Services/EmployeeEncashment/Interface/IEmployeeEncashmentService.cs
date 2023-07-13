using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IEmployeeEncashmentService : IAsyncService<EmployeeEncashment>
    {
        Task<FianlSettlementLeaveBalanceView> GetLeaveBalanceDetails(DateTime fromDate, DateTime toDate, int employeeId);
        Task<EmployeeEncashmentComponentView> GetEmployeeEncashmentComponents( int employeeId);
        Task<int> EmployeeEncashmentInsert(EmployeeEncashment employeeEncashment);
        Task<int> EmployeeEncashmentUpdate(EmployeeEncashment employeeEncashment);
        Task<IEnumerable<EmployeeEncashment>> GetEmployeeEncashmentList();
        Task<int> EmployeeEncashmentDelete(int encashmentId);
        Task<EmployeeEncashment> GetEmployeeEncashmentById(int id);
        Task<int> EmployeeEncashmentProcess(EmployeeEncashment employeeEncashment);
    }
}
