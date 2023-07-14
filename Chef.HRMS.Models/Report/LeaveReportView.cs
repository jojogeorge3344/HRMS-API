using Chef.Common.Core;
using System;

namespace Chef.HRMS.Models;

public class LeaveReportView : Model
{
    public int EmployeeId { get; set; }

    public string EmployeeCode { get; set; }

    public string EmployeeName { get; set; }

    public string Department { get; set; }

    public string LeaveType { get; set; }

    public DateTime FromDate { get; set; }

    public DateTime ToDate { get; set; }

    public int NumberOfDays { get; set; }

    public DateTime AppliedOn { get; set; }

    public string ApprovedBy { get; set; }

    public DateTime ApprovedOn { get; set; }
}
