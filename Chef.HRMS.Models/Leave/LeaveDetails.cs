using Chef.Common.Core;
using Chef.HRMS.Types;
using System;

namespace Chef.HRMS.Models;

public class LeaveDetails : Model
{
    public int EmployeeId { get; set; }
    public int LeaveId { get; set; }
    public int LeaveComponentId { get; set; }
    public int LeaveType { get; set; }
    public DateTime LeaveDate { get; set; }
    public RequestStatusType LeaveStatus { get; set; }
    public int PayrollId { get; set; }
    public PayrollProcessingStatus PayrollStatus { get; set; }
}
