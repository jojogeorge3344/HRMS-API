using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class PayslipConfigurationFieldsService : AsyncService<PayslipConfigurationFields>, IPayslipConfigurationFieldsService
{
    private readonly IPayslipConfigurationFieldsRepository payslipConfigurationFieldsRepository;

    public PayslipConfigurationFieldsService(IPayslipConfigurationFieldsRepository payslipConfigurationFieldsRepository)
    {
        this.payslipConfigurationFieldsRepository = payslipConfigurationFieldsRepository;
    }

    public async Task<int> UpdatePayslipConfigurationFieldsAsync(IEnumerable<PayslipConfigurationFields> payslipConfigurationFields)
    {
        return await payslipConfigurationFieldsRepository.UpdatePayslipConfigurationFieldsAsync(payslipConfigurationFields);
    }
}
