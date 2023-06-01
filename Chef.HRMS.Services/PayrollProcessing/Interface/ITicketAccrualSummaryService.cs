using Chef.HRMS.Models;
using Chef.HRMS.Models.PayrollProcessing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services.PayrollProcessing.Interface
{
    public interface ITicketAccrualSummaryService : IAsyncService<TicketAccrualSummary>
    {
    }
}
