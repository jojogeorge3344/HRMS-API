using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IPayslipConfigurationFieldsService : IAsyncService<PayslipConfigurationFields>
    {
        public Task<int> UpdatePayslipConfigurationFieldsAsync(IEnumerable<PayslipConfigurationFields> payslipConfigurationFields);
    }
}
