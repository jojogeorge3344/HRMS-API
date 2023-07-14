using Chef.Common.Core;
using Chef.Common.Core.Extensions;
using Chef.Common.Types;
using Chef.HRMS.Types;
using System;

namespace Chef.HRMS.Models;

public class EmployeeRevisionNewDetailsBoldDto : ViewModel
{
    public string LeaveStructureName { get; set; }
    public string ShiftName { get; set; }
    public Chef.HRMS.Types.WeekOff WeekOff { get; set; }
    public string WeekOffName => EnumExtension.GetDescription(WeekOff);
    public string HolidayCategoryName { get; set; }
    public string EOSName { get; set; }
    public string JobTitleName { get; set; }
    public DepartmentType DepartmentId { get; set; }
    public string DepartmentName => EnumExtension.GetDescription(DepartmentId);
    public WorkerType WorkerType { get; set; }
    public string WorkerTypeName => EnumExtension.GetDescription(WorkerType);
    public TimeType TimeType { get; set; }
    public string TimeTypeName => EnumExtension.GetDescription(TimeType);
    public AttendanceTrackingType AttendanceTrackingId { get; set; }
    public string AttendanceTrackingName => EnumExtension.GetDescription(AttendanceTrackingId);
    public string PayrollStructureName { get; set; }
    public string PayGroupName { get; set; }
    public string OverTimePolicyName { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string MiddleName { get; set; }
    public DateTime EffectiveFrom { get; set; }
    public string Remark { get; set; }
    public string ReqNum { get; set; }
    public int RequestedBy { get; set; }
    public DateTime RequestedDate { get; set; }
    public string RequestedByFirstName { get; set; }
    public string RequestedByLastName { get; set; }
    public string RequestedByMiddleName { get; set; }
}
