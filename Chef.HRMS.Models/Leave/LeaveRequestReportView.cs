using Chef.Common.Core;
using System;

namespace Chef.HRMS.Models;

public class LeaveRequestReportView : ViewModel
{
    public string RequestNumber { get; set; }

    public string EmployeeName { get; set; }

    public DateTime LeaveStartDate { get; set; }

    public DateTime LeaveEndDate { get; set; }

    public string RequestedBy { get; set; }

    public string RequestedOn { get; set; }

    public string LeaveName { get; set; }

    public int NumberOfDays { get; set; }

    public int LeaveType { get; set; }

    public DateTime RejoinDate { get; set; }

    public string Note { get; set; }
}
