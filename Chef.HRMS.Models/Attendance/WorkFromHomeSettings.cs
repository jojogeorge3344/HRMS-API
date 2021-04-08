using Chef.Common.Core;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Chef.HRMS.Models
{
    public class WorkFromHomeSettings : Model
    {
        /// <summary>
        /// Holds the value of whether an employee can enable work from home
        /// </summary>
        [Required]
        [Description("An employee can enable and disable the work from home")]
        public bool IsEnabled { get; set; }

        /// <summary>
        /// Holds the value of which approval flow is using for the approval of work from home
        /// </summary>
        [Required]
        [Description("Which Approval flow is using for the approval")]
        public int ApprovalWorkflowId { get; set; }

        /// <summary>
        /// Holds the value of, is there any limit for work from home 
        /// </summary>
        [Required]
        [Description("Do you wish to limit the number of Work From Homes that can be availed")]
        public bool IsLimited { get; set; }

        /// <summary>
        /// Holds the value of how many days/weeks/year the work from home is availed 
        /// </summary>
        [Description("Availed number of work from home")]
        public int MaximumLimit { get; set; }

        /// <summary>
        /// Holds the  duration type of work from home
        /// </summary>
        [Description("Duration type")]
        public WorkFromHomePeriodType PeriodType { get; set; }

        /// <summary>
        /// Holds the value of days prior to present date
        /// </summary>
        [Required]
        [Description("The value of days prior to present date")]
        public int PriorDays { get; set; }
        /// <summary>
        /// Holds the value of days subsequent to present date
        /// </summary>
        [Required]
        [Description("The value of days subsequent to present date")]
        public int SubsequentDays { get; set; }

    }
}
