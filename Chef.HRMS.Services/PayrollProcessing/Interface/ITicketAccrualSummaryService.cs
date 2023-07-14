using Chef.HRMS.Models.PayrollProcessing;

namespace Chef.HRMS.Services.PayrollProcessing.Interface;

public interface ITicketAccrualSummaryService : IAsyncService<TicketAccrualSummary>
{
    Task<int> GenerateAndInsertTicketAccrualSummary(List<TicketAccrual> ticketAccruals);
}
