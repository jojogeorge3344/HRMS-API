using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services.Payroll
{
    public class PayslipSettingDetailsService : AsyncService<PayslipSettingDetails>, IPayslipSettingDetailsService
    {
        private readonly IPayslipSettingDetailsRepository payslipSettingDetailsRepository;

        public PayslipSettingDetailsService(IPayslipSettingDetailsRepository payslipSettingDetailsRepository)
        {
            this.payslipSettingDetailsRepository = payslipSettingDetailsRepository;
        }
    }
}
