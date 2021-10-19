using Chef.Common.Core;
using Chef.HRMS.Types;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Chef.HRMS.Models
{
    public class PayrollCalendar : Model
    {
        /// <summary>
        /// Holds the payroll calendar name
        /// </summary>
        [Required]
        [StringLength(32)]
        [Description("Payroll calendar name")]
        public string Name { get; set; }

        /// <summary>
        /// Holds the payroll calendar period type
        /// </summary>
        [Required]
        [Description("Payroll calendar period type")]
        public PayrollPeriodType PeriodType { get; set; }

        /// <summary>
        /// Holds the payroll calendar starting month/week 
        /// </summary>
        [Required]
        [Description("Payroll calendar starting month/week")]
        public int StartsFrom { get; set; }

        /// <summary>
        /// Holds the payroll calendar period cycle/week start day
        /// </summary>
        [Required]
        [Description("Payroll calendar period cycle/week start day")]
        public int ProcessingDay { get; set; }
    }
}
