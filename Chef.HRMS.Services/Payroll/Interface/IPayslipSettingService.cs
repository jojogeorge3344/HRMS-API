using Chef.HRMS.Models;
using Microsoft.AspNetCore.Mvc;
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
        Task<IEnumerable<PayrollStructure>> GetAllPayrollStructure();
        Task<IEnumerable<PayslipSettingView>> GetPayslipSettingById(int id);
        Task<int> DeletePayslipSetting(int id);
        Task<bool> IsPayslipSettingCodeExist(string code);
    }
}
