using Chef.Common.Core;
using Chef.Common.Core.Extensions;
using Chef.HRMS.Types;
using System;

namespace Chef.HRMS.Models.Report;

public class LeaveDetailedReportView : Model
{
    public string EmployeeCode { get; set; }
    public string EmployeeFullName { get; set; }
    public string LeaveComponentName { get; set; }
    public string ReportType { get; set; }
    public DateTime ToDate { get; set; }
    public DateTime FromDate { get; set; }
    public LeaveType LeaveType { get; set; }
    public string LeaveTypeName => EnumExtension.GetDescription(LeaveType);
    public DateTime LeaveDate { get; set; }
    public string Reason { get; set; }
}
