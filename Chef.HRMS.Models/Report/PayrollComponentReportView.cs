using Chef.Common.Core;
using Chef.Common.Core.Extensions;
using Chef.HRMS.Types;
using System;

namespace Chef.HRMS.Models;

public class PayrollComponentReportView : ViewModel
{
    public int EarningComponentId { get; set; }
    public int DeductionComponentId { get; set; }
    public string EarningComponentName { get; set; }
    public string DeductionComponentName { get; set; }
    public decimal EarningsAmt { get; set; }
    public decimal DeductionAmt { get; set; }
    public PayHeadBaseUnitType PayHeadBaseUnitType { get; set; }
    public string PayHeadType => EnumExtension.GetDescription(PayHeadBaseUnitType);
    public decimal MinimumLimit { get; set; }
    public decimal MaximumLimit { get; set; }
    public DateTime PayrollProcessDate { get; set; }
    public int EmployeeId { get; set; }
    public decimal BasicPay { get; set; }
    //public decimal NormalOverTimeHrs { get; set; }
    //public decimal HolidayOverTimeHrs { get; set; }
    //public decimal SpecialOverTimeHrs { get; set; }
}
