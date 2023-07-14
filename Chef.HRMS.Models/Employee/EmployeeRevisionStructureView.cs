using Chef.Common.Core;

namespace Chef.HRMS.Models;

public class EmployeeRevisionStructureView : ViewModel
{
    public int PayrollStructureId { get; set; }
    public string PayrollStructureCode { get; set; }
    public string PayrollStructureName { get; set; }
    public int PayrollComponentId { get; set; }
    public string PayrollComponentCode { get; set; }
    public string PayrollComponentName { get; set; }
    public int MaximumLimit { get; set; }
}