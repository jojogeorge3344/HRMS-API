using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IPayslipSettingService : IAsyncService<PayslipSetting>
    {
        Task<int> InsertPayslipSetting(PayslipSetting payslipSetting); 
        Task<int> UpdatePayslipSetting(PayslipSetting payslipSetting);
        Task<IEnumerable<PayrollComponent>> GetComponentsByStructureId(int structureId);
    }
}
