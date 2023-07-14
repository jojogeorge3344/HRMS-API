using Chef.Common.Core;

namespace Chef.HRMS.Models;

public class EmployeeRevisionSalaryView : ViewModel
{
    public int PayrollComponentId { get; set; }
    public string ShortCode { get; set; }
    public string Name { get; set; }
    public string Formula { get; set; }
    public int MonthlyAmount { get; set; }
    public int PayrollCalculationId { get; set; }
}
