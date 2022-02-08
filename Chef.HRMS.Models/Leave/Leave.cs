using Chef.Common.Core;
using Chef.HRMS.Types;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class Leave : Model
    {
        /// <summary>
        /// Holds leave type id
        /// </summary>
        [Required]
        [ForeignKey("LeaveComponent")]
        public int LeaveComponentId { get; set; }

        /// <summary>
        /// Holds leave type id
        /// </summary>
        [Required]
        [ForeignKey("LeaveStructure")]
        public int LeaveStructureId { get; set; }

        /// <summary>
        /// Holds leave requested by user
        /// </summary>
        [Required]
        [ForeignKey("Employee")]
        public int EmployeeId { get; set; }

        /// <summary>
        /// Holds leave approved by
        /// </summary>
        public int ApprovedBy { get; set; }

        /// <summary>
        /// Holds leavve approved date
        /// </summary>
        public DateTime ApprovedDate { get; set; }

        /// <summary>
        /// Holds description
        /// </summary>
        [Required]
        [StringLength(128)]
        public string Description { get; set; }

        /// <summary>
        /// Holds from date
        /// </summary>
        [Required]
        public DateTime FromDate { get; set; }

        /// <summary>
        /// Holds to date
        /// </summary>
        [Required]
        public DateTime ToDate { get; set; }

        /// <summary>
        /// Holds the value of if first day is a full day leave
        /// </summary>
        public bool IsFullDay { get; set; }

        /// <summary>
        /// Holds the value of if first day first half is leave
        /// </summary>
        public bool IsFirstDayFirstHalf { get; set; }

        /// <summary>
        /// Holds the value of if first day second half is leave
        /// </summary>
        public bool IsFirstDaySecondHalf { get; set; }

        /// <summary>
        /// Holds the value of if second day first half is leave
        /// </summary>
        public bool IsSecondDayFirstHalf { get; set; }

        /// <summary>
        /// Holds the value of if second day second half is leave
        /// </summary>
        public bool IsSecondDaySecondHalf { get; set; }

        /// <summary>
        /// Holds the leave status id
        /// </summary>
        [Required]
        public RequestStatusType LeaveStatus { get; set; }

        /// <summary>
        /// Holds the number of days taking the leave
        /// </summary>
        public decimal NumberOfDays { get; set; }

        public DateTime currentDate { get; set; }
    }
}