using Chef.Common.Models;
using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface ICompanyService : IAsyncService<HRMSCompany>
{
    Task<HRMSCompany> GetAsync();

    Task<IEnumerable<KeyValue>> GetBusinessTypeAsync();
}