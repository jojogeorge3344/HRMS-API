using Chef.Common.Core;
using Chef.HRMS.Types;
using System.Collections.Generic;

namespace Chef.HRMS.Models;

public class LeaveEligibility : Model
{
    public string LeaveCode { get; set; }
    public string LeaveDescription { get; set; }
    public int EligibleDays { get; set; }
    public int EligibilityBase { get; set; }
    public int MaxLeaveAtATime { get; set; }
    public string VacationSalaryFormula { get; set; }
    public int EncashBFCode { get; set; }
    public int EncashLimitDays { get; set; }
    public int CFLimitDays { get; set; }
    public BaseType BaseType { get; set; }
    public bool IsIncludeLOPDays { get; set; }
    public LeaveType LeaveType { get; set; }
    public LeaveCutOffType LeaveCutOffType { get; set; }
    public string AccruedLeaveAmount { get; set; }
    public bool IsEncash { get; set; }
    public bool IsCarryForward { get; set; }
    public int LeaveComponentId { get; set; }
    public int AnnualLeave { get; set; }
    public int LeaveEncashment { get; set; }
    public int LeaveDeduction { get; set; }

    [Write(false)]
    [Skip(true)]
    [SqlKata.Ignore]
    public int EmployeeId { get; set; }

    [Write(false)]
    [Skip(true)]
    [SqlKata.Ignore]
    public string EmployeeCode { get; set; }

    [Write(false)]
    [Skip(true)]
    [SqlKata.Ignore]
    public string EmployeeName { get; set; }

    [Write(false)]
    [Skip(true)]
    [SqlKata.Ignore]
    public int MonthlyAmount { get; set; }

    [SqlKata.Ignore]
    [Write(false)]
    [Skip(true)]
    public List<LeaveComponentLopDetails> LeaveComponentLopDetails { get; set; }

    [SqlKata.Ignore]
    [Write(false)]
    [Skip(true)]
    public int PayrollProcessingId { get; set; }
}
