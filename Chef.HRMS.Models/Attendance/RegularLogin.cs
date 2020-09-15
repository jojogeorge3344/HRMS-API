using Chef.Common.Core;
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
    }
}
