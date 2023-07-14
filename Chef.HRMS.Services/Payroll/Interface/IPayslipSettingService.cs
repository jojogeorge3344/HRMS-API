using Chef.HRMS.Models;
using Chef.HRMS.Models.Payroll;

namespace Chef.HRMS.Services;

public interface IPayslipSettingService : IAsyncService<PayslipSetting>
{
    Task<int> InsertPayslipSetting(PayslipSetting payslipSetting);
    Task<int> UpdatePayslipSetting(PayslipSetting payslipSetting);
    Task<IEnumerable<PayrollComponent>> GetComponentsByStructureId(int structureId);
    Task<IEnumerable<PayrollStructure>> GetAllPayrollStructure();
    Task<PayslipSetting> GetPayslipSettingById(int id);
    Task<int> DeletePayslipSetting(int id);
    Task<bool> IsPayslipSettingCodeExist(string code);
    Task<IEnumerable<PayslipSettingList>> GetAllPayslipSettings();
}
