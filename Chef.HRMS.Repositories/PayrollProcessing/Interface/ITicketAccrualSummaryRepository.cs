using Chef.HRMS.Models.PayrollProcessing;

namespace Chef.HRMS.Repositories;

public interface ITicketAccrualSummaryRepository : IGenericRepository<TicketAccrualSummary>
{
    Task<TicketAccrualSummary> GetPreviousTicketAccrualSummary(int employeeId);
}
