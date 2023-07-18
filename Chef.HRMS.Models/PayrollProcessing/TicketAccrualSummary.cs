using Chef.Common.Core;
using System;

namespace Chef.HRMS.Models.PayrollProcessing;

public class TicketAccrualSummary : Model
{
    public int EmployeeId { get; set; }
    public DateTime AccrualDate { get; set; }
    public decimal AccrualDays { get; set; }
    public decimal AccrualAmount { get; set; }
    public decimal AvailDays { get; set; }
    public decimal AvailAmount { get; set; }
}
