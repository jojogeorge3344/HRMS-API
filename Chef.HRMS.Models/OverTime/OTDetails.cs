using System;

namespace Chef.HRMS.Models;

public class OTDetails
{
    public int NOTComponentID { get; set; }
    public int SOTComponentID { get; set; }
    public int HOTComponentID { get; set; }
    public Decimal NormalOverTime { get; set; }
    public Decimal HolidayOverTime { get; set; }
    public Decimal SpecialOverTime { get; set; }
    public Decimal NOTRate { get; set; }
    public Decimal SOTRate { get; set; }
    public Decimal HOTRate { get; set; }
}
