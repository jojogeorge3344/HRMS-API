using System.ComponentModel;

namespace Chef.HRMS.Types
{
    public enum AttendanceCaptureSchemeType
    {
        [Description("Web Checkin")]
        WebCheckin = 1,

        [Description("CXO Attendance")]
        CXOAttendance,
    }
}
