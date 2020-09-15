using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IPayrollComponentConfigurationService : IAsyncService<PayrollComponentConfiguration>
    {
        Task<IEnumerable<PayrollComponentConfiguration>> GetAllByPayrollStuctureId(int payrollStructureId);
        Task<int> InsertAsync(IEnumerable<PayrollComponentConfiguration> payrollComponentConfiguration, IEnumerable<int> PayrollComponentConfigurationIds);
    }
}