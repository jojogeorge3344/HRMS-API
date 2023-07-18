using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class PayslipConfigurationService : AsyncService<PayslipConfiguration>, IPayslipConfigurationService
{
    private readonly IPayslipConfigurationRepository payslipConfigurationRepository;

    public PayslipConfigurationService(IPayslipConfigurationRepository payslipConfigurationRepository)
    {
        this.payslipConfigurationRepository = payslipConfigurationRepository;
    }
}
