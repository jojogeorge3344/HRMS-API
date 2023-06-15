using Chef.HRMS.Models;
using Chef.HRMS.Models.PayrollProcessing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services.PayrollProcessing.Interface
{
    public interface ITicketAccrualService : IAsyncService<TicketAccrual>
    {
        Task<IEnumerable<TicketAccrual>> GenerateTicketAccruals(int paygroupid);
        Task<int> GenerateTicketAvailed(TicketAccrual ticketAvailedDetails);
        Task<int> InsertTicketAccruals(List<TicketAccrual> ticketAccruals);
    }
}
