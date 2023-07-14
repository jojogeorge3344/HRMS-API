using Chef.Common.Core;
using System;

namespace Chef.HRMS.Models.PayrollProcessing;

public class EOSAccrualSummary : Model
{
    public int Id { get; set; }
    public int EmployeeId { get; set; }

    public DateTime AccrualDate { get; set; }

    //public int LeaveId { get; set; }

    public decimal AccrualDays { get; set; }

    public decimal AccrualAmount { get; set; }

    public decimal AvaillDays { get; set; }

    public decimal AvailAmount { get; set; }

}
