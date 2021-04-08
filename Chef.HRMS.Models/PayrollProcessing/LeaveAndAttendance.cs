using Chef.Common.Core;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class LeaveAndAttendance : Model
    {
        /// <summary>
        /// Holds payroll processing method id
        /// </summary>
        [ForeignKey("PayrollProcessingMethod")]
        [Required]
        public int PayrollProcessingMethodId { get; set; }

        /// <summary>
        /// Holds the employee id
        /// </summary>
        [ForeignKey("Employee")]
        [Required]
        public int EmployeeId { get; set; }

        /// <summary>
        /// Holds the pay group id
        /// </summary>
        [ForeignKey("PayGroup")]
        [Required]
        public int PayGroupId { get; set; }

        /// <summary>
        /// Holds employee code
        /// </summary>
        public string EmployeeCode { get; set; }

        /// <summary>
        /// Holds employee name
        /// </summary>
        public string EmployeeName { get; set; }

        /// <summary>
        /// Holds number of working days 
        /// </summary>
        [Required]
        public int NumberOfWorkingDays { get; set; }

        /// <summary>
        /// Holds number of worked days
        /// </summary>
        [Required]
        public int NumberOfWorkedDays { get; set; }

        /// <summary>
        /// Holds number of applied leaves
        /// </summary>
        [Required]
        public int LeaveApplied { get; set; }

        /// <summary>
        /// Holds number of approved leaves
        /// </summary>
        [Required]
        public int ApprovedLeaves { get; set; }

        /// <summary>
        /// Holds number of unapproved leaves
        /// </summary>
        [Required]
        public int UnapprovedLeaves { get; set; }

        /// <summary>
        /// Holds number of lop count
        /// </summary>
        [Required]
        public int Lop { get; set; }

        /// <summary>
        /// Holds unapplied/unmarked attendance
        /// </summary>
        [Required]
        public int UnmarkedAttendance { get; set; }

        /// <summary>
        /// Holds status of this step during processing
        /// </summary>
        [Required]
        public PayrollProcessingStatus Status { get; set; }
    }
}
