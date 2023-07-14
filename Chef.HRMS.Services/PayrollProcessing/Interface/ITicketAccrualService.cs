using Chef.HRMS.Models.PayrollProcessing;

namespace Chef.HRMS.Services.PayrollProcessing.Interface;

public interface ITicketAccrualService : IAsyncService<TicketAccrual>
{
    Task<IEnumerable<TicketAccrual>> GenerateTicketAccruals(int paygroupid);
    Task<int> GenerateTicketAvailed(TicketAccrual ticketAvailedDetails);
    Task<int> InsertTicketAccruals(List<TicketAccrual> ticketAccruals);
    Task<List<TicketAccrual>> GetGeneratedTicketAccruals(int payrollprocessid);
}
