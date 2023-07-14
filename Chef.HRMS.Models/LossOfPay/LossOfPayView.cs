using Chef.Common.Core;

namespace Chef.HRMS.Models;

public class LossOfPayView : ViewModel
{
    public int LossOfPay { get; set; }

    public decimal LOPDeduction { get; set; }
}