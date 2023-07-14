using Chef.Common.Core;

namespace Chef.HRMS.Models.Payroll;

public class PayslipSettingList : Model
{
    public string Code { get; set; }
    public string Name { get; set; }
    public int StructureId { get; set; }
    public int PayslipOrderNumber { get; set; }
    public bool IsActive { get; set; }
    public string PayrollStructureName { get; set; }
}
