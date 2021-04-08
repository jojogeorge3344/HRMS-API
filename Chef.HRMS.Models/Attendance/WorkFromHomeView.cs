using System.ComponentModel;

namespace Chef.HRMS.Models
{
    public class WorkFromHomeView
    {
        /// <summary>
        /// Holds the value total number of work from home requests requested by employee
        /// </summary>
        [Description("Total number of requets by employee")]
        public int TotalRequest { get; set; }

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
    }
}
