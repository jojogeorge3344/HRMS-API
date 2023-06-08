using Chef.HRMS.Models;
using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Chef.HRMS.Models.PayrollProcessing;

namespace Chef.HRMS.Repositories
{
    public interface ITicketAccrualSummaryRepository : IGenericRepository<TicketAccrualSummary>
    {
        Task<TicketAccrualSummary> GetPreviousTicketAccrualSummary(int employeeId, int day, int month, int year);
    }
}
