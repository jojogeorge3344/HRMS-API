﻿using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IPassportService : IAsyncService<Passport>
    {
        Task<IEnumerable<PassportView>> GetByEmployeeId(int employeeId);
    }
}