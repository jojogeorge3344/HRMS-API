﻿using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IEmployeeBonusService : IAsyncService<EmployeeBonus>
    {
        Task<IEnumerable<EmployeeBonus>> GetAllBonusByEmployeeId(int employeeId);
        Task<IEnumerable<EmployeeBonusView>> GetAllBonusByEmployeeIdAndPayrollProcessingMethodId(int employeeId, int payrollProcessingMethodId);
        Task<IEnumerable<EmployeeBonusView>> GetAllBonusByPayGroupId(int payrollProcessingMethodId);

        Task<int> DeleteAllBonusByEmployeeId(int employeeId);
    }
}