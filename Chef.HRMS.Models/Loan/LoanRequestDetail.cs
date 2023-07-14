using Chef.Common.Core;

namespace Chef.HRMS.Models.Loan;

public class LoanRequestDetail : Model
{
    public int LoanRequestId { get; set; }
    public int Year { get; set; }
    public string Month { get; set; }
    public int RepaymentAmount { get; set; }
    public bool Status { get; set; }
}
