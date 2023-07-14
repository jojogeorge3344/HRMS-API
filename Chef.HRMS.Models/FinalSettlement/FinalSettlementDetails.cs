using Chef.Common.Core;

namespace Chef.HRMS.Models;

public class FinalSettlementDetails : Model
{
    public int FinalSettlementId { get; set; }
    public int PayrollComponentId { get; set; }
    public decimal PaidDays { get; set; }
    public decimal DeductionAmt { get; set; }
    public decimal EarningsAmt { get; set; }

    [Write(false)]
    [Skip(true)]
    [SqlKata.Ignore]
    public string PayrollComponentCode { get; set; }

    [Write(false)]
    [Skip(true)]
    [SqlKata.Ignore]
    public string PayrollComponentName { get; set; }
}
