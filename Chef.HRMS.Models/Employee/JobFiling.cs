using Chef.Common.Core;
using Chef.HRMS.Types;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class JobFiling : Model
    {
        /// <summary>
        /// Holds attendance capture scheme
        /// </summary>
        [Required]
        public AttendanceCaptureSchemeType AttendanceCaptureScheme { get; set; }

        /// <summary>
        /// Holds attendance tracking policy
        /// </summary>
        [Required]
        public AttendanceTrackingType AttendanceTracking { get; set; }

        /// <summary>
        /// Holds employee id
        /// </summary>
        [Required]
        [ForeignKey("Employee")]
        public int EmployeeId { get; set; }

        /// <summary>
        /// Holds expense policy
        /// </summary>
        public int ExpensePolicyId { get; set; }

        /// <summary>
        /// Holds holiday category id
        /// </summary>
        [Required]
        [ForeignKey("HolidayCategory")]
        public int HolidayCategoryId { get; set; }

        /// <summary>
        /// Holds leave plan id
        /// </summary>
        [Required]
        [ForeignKey("LeaveStructure")]
        public int LeaveStructureId { get; set; }

        /// <summary>
        /// Holds payroll structure id
        /// </summary>
        public int PayrollStructureId { get; set; }

        /// <summary>
        /// Holds pay group id
        /// </summary>
        public int PayGroupId { get; set; }

        /// <summary>
        /// Holds shift type
        /// </summary>
        [Required]
        [ForeignKey("Shift")]
        public int ShiftId { get; set; }

        /// <summary>
        /// Holds from details of over time policy
        /// </summary>
        public int OverTimePolicyId { get; set; }

        /// <summary>
        /// Holds week off type
        /// </summary>
        [Required]
        public int WeekOff { get; set; }

        /// <summary>
        /// Holds payment mode
        /// </summary>
        public PaymentMode PaymentMode { get; set; }
    }
}