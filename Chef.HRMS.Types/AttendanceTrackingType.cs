using System.ComponentModel;

namespace Chef.HRMS.Types
{
    public enum AttendanceTrackingType
    {
        [Description("Web Checkin")]
        WebCheckin = 1,

        [Description("Swipping")]
        Swiping = 2,
    }
}
