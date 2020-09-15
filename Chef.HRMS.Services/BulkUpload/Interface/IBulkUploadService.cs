﻿using Chef.Common.Services;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
   public interface IBulkUploadService : IAsyncService<Leave>
    {

        Task<int> BulkInsertLeave(IEnumerable<Leave> leave);
        Task<int> BulkInsertWorkFromHome(IEnumerable<WorkFromHome> workFromHome);
        Task<int> BulkInsertOnduty(IEnumerable<OnDuty> onDuty);
        Task<int> BulkInsertRegularLogin(IEnumerable<RegularLogin> regularLogin);
    }
}
