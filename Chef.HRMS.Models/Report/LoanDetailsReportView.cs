using Chef.Common.Core;

namespace Chef.HRMS.Models;

public class LoanDetailsReportView : ViewModel
{
    public int LoanAmount { get; set; }
    public int RepaymentAmount { get; set; }
}
