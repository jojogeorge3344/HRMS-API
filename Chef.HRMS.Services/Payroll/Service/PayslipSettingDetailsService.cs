using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services.Payroll;

public class PayslipSettingDetailsService : AsyncService<PayslipSettingDetails>, IPayslipSettingDetailsService
{
    private readonly IPayslipSettingDetailsRepository payslipSettingDetailsRepository;

    public PayslipSettingDetailsService(IPayslipSettingDetailsRepository payslipSettingDetailsRepository)
    {
        this.payslipSettingDetailsRepository = payslipSettingDetailsRepository;
    }
}
