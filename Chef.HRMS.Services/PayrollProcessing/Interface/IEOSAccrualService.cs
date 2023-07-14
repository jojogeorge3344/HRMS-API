using Chef.HRMS.Models.PayrollProcessing;

namespace Chef.HRMS.Services.PayrollProcessing.Interface;

public interface IEOSAccrualService : IAsyncService<EOSAccrual>
{
    Task<IEnumerable<EOSAccrual>> GenerateEndOfServiceAccruals(int paygroupid);
    Task<int> GenerateEndOfServiceAvailed(EOSAccrual eosAvailedDetails);
    Task<int> InsertEOSAccruals(List<EOSAccrual> endOfServiceAccruals);
    Task<List<EOSAccrual>> GetGeneratedEOSAccruals(int payrollprocessid);
}
