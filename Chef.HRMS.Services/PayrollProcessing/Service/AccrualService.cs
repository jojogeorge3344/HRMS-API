using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Chef.HRMS.Services.PayrollProcessing.Interface;

namespace Chef.HRMS.Services.PayrollProcessing.Service
{
    public class AccrualService : AsyncService<Accruals>, IAccrualService
    {
        private readonly ITenantSimpleUnitOfWork tenantSimpleUnitOfWork;
        private readonly ILeaveAccrualService leaveAccrualService;
        private readonly IEOSAccrualService eosAccrualService;
        private readonly ITicketAccrualService ticketAccrualService;
        private readonly ILeaveAccrualSummaryService leaveAccrualSummaryService;
        private readonly IEOSAccrualSummaryService eosAccrualSummaryService;
        private readonly ITicketAccrualSummaryService ticketAccrualSummaryService;

        public AccrualService(
            ITenantSimpleUnitOfWork tenantSimpleUnitOfWork,
            ILeaveAccrualService leaveAccrualService,
            IEOSAccrualService eosAccrualService,
            ITicketAccrualService ticketAccrualService,
            ILeaveAccrualSummaryService leaveAccrualSummaryService,
            IEOSAccrualSummaryService eosAccrualSummaryService,
            ITicketAccrualSummaryService ticketAccrualSummaryService)
        {
            this.tenantSimpleUnitOfWork = tenantSimpleUnitOfWork;
            this.leaveAccrualService = leaveAccrualService;
            this.eosAccrualService = eosAccrualService;
            this.ticketAccrualService = ticketAccrualService;
            this.eosAccrualSummaryService = eosAccrualSummaryService;
            this.leaveAccrualSummaryService = leaveAccrualSummaryService;
            this.ticketAccrualSummaryService = ticketAccrualSummaryService;
        }

        public async Task<int> SaveAccruals(Accruals accrualsList)
        {
            int result = 0;
            tenantSimpleUnitOfWork.BeginTransaction();
            try
            {
                result = await leaveAccrualService.InsertLeaveAccruals(accrualsList.LeaveAccruals);

                if (result > 0)
                {
                    result = await leaveAccrualSummaryService.GenerateAndInsertLeaveAccrualSummary(accrualsList.LeaveAccruals);
                }

                result = await eosAccrualService.InsertEOSAccruals(accrualsList.EOSAccruals);
                if (result > 0)
                {
                    result = await eosAccrualSummaryService.GenerateAndInsertEOSAccrualSummary(accrualsList.EOSAccruals);
                }

                result = await ticketAccrualService.InsertTicketAccruals(accrualsList.TicketAccruals);
                if (result > 0)
                {
                    result = await ticketAccrualSummaryService.GenerateAndInsertTicketAccrualSummary(accrualsList.TicketAccruals);
                }
                tenantSimpleUnitOfWork.Commit();
                return result;
            }
            catch
            {
                tenantSimpleUnitOfWork.Rollback();
                return result;
            }
        }
    }
}
