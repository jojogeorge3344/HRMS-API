﻿using Chef.HRMS.Models;
using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface ILeaveAccrualSummaryRepository : IGenericRepository<LeaveAccrualSummary>
    {
        Task<LeaveAccrualSummary> GetPreviousAccrualSummary(int employeeId, int day, int month, int year);
    }
}