using Chef.Common.Core;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class OverTimePolicyConfiguration : Model
    {
        /// <summary>
        /// Holds from details of over time policy id
        /// </summary>
        [Required]
        [ForeignKey("OverTimePolicy")]
        [Description("Over Time Policy Id")]
        public int OverTimePolicyId { get; set; }

        /// <summary>
        /// Holds from details of over time policy name
        /// </summary>
        [Required]
        [ForeignKey("OverTimePolicy")]
        [Description("Over Time Policy name")]
        public string OverTimePolicyName { get; set; }

        /// <summary>
        /// Holds from details of over time request should be approved before one does an overtime
        /// </summary>
        [Description("Over time request should be approved before one does an overtime")]
        public bool IsApprovalRequired { get; set; }

        /// <summary>
        /// Holds the details of how many days prior notice is required to request for OT
        /// </summary>

        [Description("How many days prior notice is required to request for OT")]
        public float NoticeDays { get; set; }

        /// <summary>
        /// Holds the details of OT maximum hour limit
        /// </summary>
        [Description("Over time  maxminum  limit in hours")]
        public float MaximumLimit { get; set; }

        /// <summary>
        /// Holds the details of OT maximum  limit period type
        /// </summary>
        [Description("Over time  maxminum  limit  period type")]
        public GeneralPeriodType PeriodType { get; set; }

        /// <summary>
        /// Holds is comment required when applying OT
        /// </summary>
        [Description("Is comment required when applying OT")]
        public bool IsCommentRequired { get; set; }

        /// <summary>
        /// Holds the details of an employee can make past dated request for OT
        /// </summary>
        [Description("can employee make past dated request for OT")]
        public bool IsPastDayRQPossible { get; set; }

        /// <summary>
        /// Holds the details  an employee can't make past dated request for OT beyond the max limit
        /// </summary>
        [Description("Employee can't make past dated request for OT beyond the max limi")]
        public float MaximumPastDayLimit { get; set; }

        /// <summary>
        /// Holds the details  an employee can't make  request for OT beyond the max calander limit in each month
        /// </summary>
        [Description("Employee can't make  request for OT beyond the max calander limit in each month")]
        public int LastDayLimit { get; set; }

        /// <summary>
        /// Holds is round off required when applying OT
        /// </summary>
        [Description("Is round off required when applying OT")]
        public bool IsRoundOffRequired { get; set; }

        /// <summary>
        /// Holds is round off value base
        /// </summary>
        [Description("Specifying round off is based on  nearest value")]
        public bool IsRoundOffNearest { get; set; }

        /// <summary>
        /// Holds is round off value base
        /// </summary>
        [Description("Specifying round off is based on  lowest  value")]
        public bool IsRoundOffLowest { get; set; }

        /// <summary>
        /// Holds the formula for normal days OT calculation
        /// </summary>

        [Description("Formula for normal days OT calculation")]
        public string NormalFormula { get; set; }

        /// <summary>
        /// Holds the formula for holidays OT calculation
        /// </summary>

        [Description("Formula for holidays OT calculation")]
        public string HolidayFormula { get; set; }

        /// <summary>
        /// Holds the formula for special OT calculation
        /// </summary>

        [Description("Formula for special OT calculation")]
        public string SpecialFormula { get; set; }

        /// <summary>
        /// Holds the details of Minimum hours for OT request
        /// </summary>

        [Description("Minimum hours for OT request")]
        public float MinimumOverTimeHour { get; set; }

        /// <summary>
        /// Holds the value of hours beyond shift hours
        /// </summary>

        [Description("Hours beyond shift hours")]
        public float TimeBeyondShiftHour { get; set; }
    }
}
