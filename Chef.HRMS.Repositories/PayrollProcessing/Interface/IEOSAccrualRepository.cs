using Chef.HRMS.Models;
using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Chef.HRMS.Models.PayrollProcessing;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Chef.HRMS.Repositories
{
    public interface IEOSAccrualRepository : IGenericRepository<EOSAccrual>
    {
        Task<IEnumerable<EOSAccrual>> GetProcessedEOSAccruals(DateTime accrualDate);
        Task<IEnumerable<EOSAccrual>> GetEOSAccrualsByPayrollProcessingId(int payrollProcessingId);
    }
}
