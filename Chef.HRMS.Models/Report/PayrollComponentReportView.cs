using Chef.Common.Core;
using Chef.Common.Core.Extensions;
using Chef.HRMS.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class PayrollComponentReportView : ViewModel
    {
       public string ShortCode { get; set; }
       public string Name { get; set; }
       public int PayrollComponentId { get; set; }
       public decimal EarningsAmt { get; set; }
       public decimal DeductionAmt { get; set; }
       public PayHeadBaseUnitType payHeadBaseUnitType { get; set; }
       public string PayHeadType => EnumExtension.GetDescription(payHeadBaseUnitType);
       public decimal MinimumLimit { get; set; }
       public decimal MaximumLimit { get; set; }
       public DateTime PayrollProcessDate { get; set; }
       public int EmployeeId { get; set; }
       public decimal BasicPay { get; set; }
       //public decimal NormalOverTimeHrs { get; set; }
       //public decimal HolidayOverTimeHrs { get; set; }
       //public decimal SpecialOverTimeHrs { get; set; }
    }
}
