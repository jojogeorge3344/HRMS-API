﻿using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IPayrollCalendarRepository : IGenericRepository<PayrollCalendar>
    {
        Task<bool> IsDuplicateValueExists(string name);
        Task<IEnumerable<int>> GetAllAssignedPayCalendar();
    }
}