﻿using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IEmployeeSalaryConfigurationDetailsService : IAsyncService<EmployeeSalaryConfigurationDetails>
    {
        Task<int> InsertEmployeeSalaryConfigDetails(IEnumerable<EmployeeSalaryConfigurationDetails> employeeSalaryConfigurationDetails);

        Task<int> UpdateEmployeeSalaryConfigDetails(IEnumerable<EmployeeSalaryConfigurationDetails> employeeSalaryConfigurationDetails);

        Task<int> DeleteByEmployeeId(int employeeId);
    }
}