using Chef.Common.Core;
using System;

namespace Chef.HRMS.Models;

public class LeaveComponentLeaveBalanceViewModel : ViewModel
{
    public int LeaveComponentId { get; set; }

    public string LeaveComponentName { get; set; }

    public string ShortCode { get; set; }

    public string Description { get; set; }

    public DateTime Calendaryearstartdate { get; set; }

    public float AnnualLeaveQuota { get; set; }

    public float LeaveBalance { get; set; }

    public bool IsRestrictedToGender { get; set; }

    public int RestrictedToGender { get; set; }

    public bool IsRestrictedToMaritalStatus { get; set; }

    public int RestrictedToMaritalStatus { get; set; }

    public bool ShowDescription { get; set; }

    public int Gender { get; set; }

    public int MaritalStatus { get; set; }
    public bool IsUnPaidLeave { get; set; }
}
