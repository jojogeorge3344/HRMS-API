using Chef.Common.Core;

namespace Chef.HRMS.Models;

public class PayrollOTDetails : Model
{
    public int PayrollOTSummaryid { get; set; }
    public int OverTimeId { get; set; }
    public int EmployeeId { get; set; }
    public decimal NotHrs { get; set; }
    public decimal HotHrs { get; set; }
    public decimal SotHrs { get; set; }
    [Write(false)]
    [Skip(true)]
    [SqlKata.Ignore]
    public decimal NotHrsAmount { get; set; }
    [Write(false)]
    [Skip(true)]
    [SqlKata.Ignore]
    public decimal HotHrsAmount { get; set; }
    [Write(false)]
    [Skip(true)]
    [SqlKata.Ignore]
    public decimal SotHrsAmount { get; set; }
    [Write(false)]
    [Skip(true)]
    [SqlKata.Ignore]
    public int ComponentId { get; set; }

}
