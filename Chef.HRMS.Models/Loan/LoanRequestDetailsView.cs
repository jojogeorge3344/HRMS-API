using Chef.Common.Core;
using Chef.Common.Models;
using Chef.HRMS.Types;
using System;

namespace Chef.HRMS.Models;

public class LoanRequestDetailsView : Model
{

    public string Comments { get; set; }

    public int EMIStartsFromMonth { get; set; }

    public int EMIStartsFromYear { get; set; }

    public int EmployeeID { get; set; }

    public DateTime ExpectedOn { get; set; }

    public decimal LoanAmount { get; set; }

    public string LoanNo { get; set; }

    public LoanType LoanType { get; set; }

    public int LoanSettingId { get; set; }

    public PaymentType PaymentType { get; set; }

    public int RepaymentTerm { get; set; }

    public DateTime RequestedDate { get; set; }

    public bool IsApproved { get; set; }

    public int ExtendedMonth { get; set; }

    public int TenureNumber { get; set; }

    public int EmiAmount { get; set; }
    public int PayrollProcessingMethodId { get; set; }

    public int BalanceAmount { get; set; }

    public int RemainingTenure { get; set; }
}
