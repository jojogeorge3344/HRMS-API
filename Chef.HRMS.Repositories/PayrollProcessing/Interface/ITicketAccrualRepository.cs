using Chef.HRMS.Models.PayrollProcessing;

namespace Chef.HRMS.Repositories;

public interface ITicketAccrualRepository : IGenericRepository<TicketAccrual>
{
    Task<IEnumerable<TicketAccrual>> GetTicketAccrualsByPayrollProcessingId(int payrollProcessingId);
}
