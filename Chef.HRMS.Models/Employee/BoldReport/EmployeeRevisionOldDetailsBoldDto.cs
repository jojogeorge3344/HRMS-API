using Chef.Common.Core;
using Chef.Common.Core.Extensions;
using Chef.Common.Types;
using Chef.HRMS.Types;

namespace Chef.HRMS.Models
{
    public class EmployeeRevisionOldDetailsBoldDto : ViewModel
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
    }
}
