using Chef.Common.Core;

namespace Chef.HRMS.Models;

public class SalaryDetailsReportView : ViewModel
{
    public decimal Amount { get; set; }
    public string ComponentName { get; set; }
}
