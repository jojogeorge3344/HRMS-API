using Chef.Common.Core.Extensions;
using Chef.HRMS.Types;

namespace Chef.HRMS.Models;

public class LoanPrintBoldReport
{
    public int Id { get; set; }
    public string LoanNumber { get; set; }
    public string NAME { get; set; }
    public int EmployeeID { get; set; }
    public string EMIStartsFromYear { get; set; }
    public decimal LoanAmount { get; set; }
    public string Comments { get; set; }
    public LoanType LoanType { get; set; }
    public int EMIStartsFromMonth { get; set; }
    public RequestStatusType Status { get; set; }
    public string LoanStatus =>EnumExtension.GetDescription(Status);
    public string Year { get; set; }
    public string Month { get; set; }
    public decimal RepaymentAmount { get; set; }
    public bool IsApproved { get; set; }

}
