using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IPayslipConfigurationFieldsService : IAsyncService<PayslipConfigurationFields>
{
    public Task<int> UpdatePayslipConfigurationFieldsAsync(IEnumerable<PayslipConfigurationFields> payslipConfigurationFields);
}
