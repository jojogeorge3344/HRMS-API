using Chef.Common.Core;
using System;

namespace Chef.HRMS.Models;

public class LeaveAccrualSummary : Model
{
    public int EmployeeId { get; set; }
    public DateTime AccrualDate { get; set; }
    public int LeaveId { get; set; }
    public decimal AccrualDays { get; set; }
    public Decimal AccrualAmount { get; set; }
    public decimal AvailDays { get; set; }
    public Decimal AvailAmount { get; set; }
}
