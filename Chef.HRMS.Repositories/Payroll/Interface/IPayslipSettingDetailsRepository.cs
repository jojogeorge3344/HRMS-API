using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IPayslipSettingDetailsRepository : IGenericRepository<PayslipSettingDetails>
    {
        Task<int> DeleteByPayslipSettingId(int payslipSettingId);
        Task<IEnumerable<PayslipSettingDetails>> GetPayslipSettingsDetailsByPayslipSettingsId(int id);
    }
}
