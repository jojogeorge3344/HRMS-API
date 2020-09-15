using Chef.Common.Core;
using System;

namespace Chef.HRMS.Models
{
    public class UserAttendanceViewModel : ViewModel
    {
        public DateTime Date { get; set; }
        public DateTime ClockIn { get; set; }
        public DateTime ClockOut { get; set; }
        public string EffectiveHours { get; set; }
        public string GrossHours { get; set; }
        public string AttendanceType { get; set; }
        public bool IsApproved { get; set; }
    }
}
