using Chef.HRMS.Models.Payroll;

namespace Chef.HRMS.Repositories;

public interface IPayslipSettingReposirory : IGenericRepository<PayslipSetting>
{
    Task<IEnumerable<PayrollComponent>> GetComponentsByStructureId(int structureId);
    Task<IEnumerable<PayrollStructure>> GetAllPayrollStructure();
    Task<bool> IsPayslipSettingCodeExist(string code);
    Task<IEnumerable<PayslipSettingList>> GetAllPayslipSettings();
}
