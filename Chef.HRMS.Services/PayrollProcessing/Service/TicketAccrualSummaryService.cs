using Chef.HRMS.Models;
using Chef.HRMS.Models.PayrollProcessing;
using Chef.HRMS.Repositories;
using Chef.HRMS.Repositories.PayrollProcessing.Repository;
using Chef.HRMS.Services.PayrollProcessing.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services.PayrollProcessing.Service
{
    public class TicketAccrualSummaryService : AsyncService<TicketAccrualSummary>, ITicketAccrualSummaryService
    {
        private readonly ITicketAccrualSummaryRepository ticketAccrualSummaryRepository;

        public TicketAccrualSummaryService(ITicketAccrualSummaryRepository ticketAccrualSummaryRepository)
        {
            this.ticketAccrualSummaryRepository = ticketAccrualSummaryRepository;
        }
        public Task<int> DeleteAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<LeaveAndAttendance>> GetAllAsync()
        {
            throw new System.NotImplementedException();
        }

        public Task<LeaveAndAttendance> GetAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<int> InsertAsync(LeaveAndAttendance obj)
        {
            throw new System.NotImplementedException();
        }
    }
}
