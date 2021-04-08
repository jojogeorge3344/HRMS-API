using System.ComponentModel;

namespace Chef.HRMS.Models
{
    public class ExpenseView
    {
        /// <summary>
        /// Holds the value total amount of expense requested by employee
        /// </summary>
        [Description("Total amount in requets by employee")]
        public float TotalAmount { get; set; }

        /// <summary>
        /// Holds the availed limit in days/weeks/year 
        /// </summary>
        [Description("Availed limit of expense")]
        public float MaximumExpenselimit { get; set; }

        /// <summary>
        /// Holds the  duration type of work from home
        /// </summary>
        [Description("Duration type")]
        public GeneralPeriodType ExpensePeriodType { get; set; }

        /// <summary>
        /// Holds the value total number of expense requested by employee
        /// </summary>
        [Description("Total number in requets by employee")]
        public int TotalRequest { get; set; }

        /// <summary>
        /// Holds the availed limit in days/weeks/year 
        /// </summary>
        [Description("Availed limit of instances")]
        public int MaximumInstancesLimit { get; set; }

        /// <summary>
        /// Holds the  duration type of instances
        /// </summary>
        [Description("Duration type")]
        public GeneralPeriodType InstancesPeriodType { get; set; }
    }
}
