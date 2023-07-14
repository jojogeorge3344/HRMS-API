using Chef.Common.Core;
using Chef.Common.Core.Extensions;
using Chef.HRMS.Types;

namespace Chef.HRMS.Models.Report;

public class JobFillingReportView : ViewModel
{
    public AttendanceCaptureSchemeType AttendanceCaptureScheme { get; set; }
    public string AttendanceCaptureSchemeName => EnumExtension.GetDescription(AttendanceCaptureScheme);
    public AttendanceTrackingType AttendanceTracking { get; set; }
    public string AttendanceTrackingName => EnumExtension.GetDescription(AttendanceTracking);
    public int EmployeeId { get; set; }
    public int ExpensePolicyId { get; set; }
    public int HolidayCategoryId { get; set; }
    public int LeaveStructureId { get; set; }
    public int PayrollStructureId { get; set; }
    public int PayGroupId { get; set; }
    public int ShiftId { get; set; }
    public int OverTimePolicyId { get; set; }
    public Chef.HRMS.Types.WeekOff WeekOff { get; set; }
    public string WeekOffName => EnumExtension.GetDescription(WeekOff);
    public PaymentMode PaymentMode { get; set; }
    public string PaymentModeName => EnumExtension.GetDescription(PaymentMode);
    public int EOSId { get; set; }
    public string BFCode { get; set; }
    public string BFName { get; set; }
    public string LeaveStructureName { get; set; }
    public string ShiftName { get; set; }
    public string holidaycategoryname { get; set; }
    public string ExpensePolicyName { get; set; }
    public string PayrollStructureName { get; set; }
    public string PayGroupName { get; set; }
    public string OverTimePolicyName { get; set; }
}
