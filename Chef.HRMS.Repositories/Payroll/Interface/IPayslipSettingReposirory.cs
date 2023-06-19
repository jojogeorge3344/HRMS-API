using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IPayslipSettingReposirory : IGenericRepository<PayslipSetting>
    {
        Task<IEnumerable<PayrollComponent>> GetComponentsByStructureId(int structureId);
        Task<IEnumerable<PayrollStructure>> GetAllPayrollStructure();
        Task<bool> IsPayslipSettingCodeExist(string code);
        Task<IEnumerable<PayslipSetting>> GetAllPayslipSettingsDetails();
    }
}
