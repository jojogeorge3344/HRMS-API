using Chef.Common.Core;
using System;

namespace Chef.HRMS.Models.Report;

public class LeaveSummaryReportView : Model
{
    public string EmployeeCode { get; set; }
    public string EmployeeFullName { get; set; }
    public decimal EligibleDays { get; set; }
    public decimal AvailedDays { get; set; }
    public string LeaveComponentName { get; set; }
    public string ReportType { get; set; }
    public DateTime ToDate { get; set; }
    public DateTime FromDate { get; set; }
}
