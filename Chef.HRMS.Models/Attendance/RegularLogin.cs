using Chef.Common.Core;
using Chef.HRMS.Types;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class RegularLogin : Model
    {
        public DateTime CheckInTime { get; set; }

        public DateTime CheckOutTime { get; set; }

        public string CheckInComment { get; set; }

        [ForeignKey("Employee")]
        public int EmployeeId { get; set; }

        public bool IsRemoteLogin { get; set; }
        public DateTime WorkingHours { get; set; }
        public DateTime GrossHours { get; set; }
        public AttendanceTrackingType AttendanceTrackingType { get; set; }

        [Write(false)]
        [Skip(true)]
        [SqlKata.Ignore]
        public string EmployeeCode { get; set; }
    }
}
