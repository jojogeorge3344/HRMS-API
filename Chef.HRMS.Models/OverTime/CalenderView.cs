using Chef.Common.Core;
using Chef.HRMS.Types;
using System;

namespace Chef.HRMS.Models;

public class CalenderView : Model
{
    public AttendanceCaptureSchemeType AttendanceCaptureScheme { get; set; }

    public AttendanceTrackingType AttendanceTracking { get; set; }

    public int EmployeeId { get; set; }

    public int WeekOff { get; set; }

    public int BreakDuration { get; set; }

    public string ShiftName { get; set; }

    public int NumberOfDays { get; set; }

    public DateTime ShiftStartTime { get; set; }

    public DateTime ShiftEndTime { get; set; }

    public string HolidayCategoryName { get; set; }

    public string HolidayDescription { get; set; }

    public DateTime HolidayDate { get; set; }

    public string HolidayName { get; set; }

    public string OverTimePolicyCode { get; set; }

    public string OverTimePolicyName { get; set; }
}
