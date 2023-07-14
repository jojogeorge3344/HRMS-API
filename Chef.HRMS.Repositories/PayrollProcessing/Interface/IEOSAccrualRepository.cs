using Chef.HRMS.Models.PayrollProcessing;

namespace Chef.HRMS.Repositories;

public interface IEOSAccrualRepository : IGenericRepository<EOSAccrual>
{
    Task<IEnumerable<EOSAccrual>> GetProcessedEOSAccruals(DateTime accrualDate);
    Task<IEnumerable<EOSAccrual>> GetEOSAccrualsByPayrollProcessingId(int payrollProcessingId);
}
