using Chef.Common.Core;
using System.ComponentModel;

namespace Chef.HRMS.Models
{
    public class LOPCalculation:Model
    {
        /// <summary>
        /// Holds lop calculation based on actual Days in the month (excluding Week-offs and Holidays)
        /// </summary>
        [Description("Actual Days in the month (excluding Week-offs and Holidays)")]
        public bool CanFullMonth { get; set; }

        /// <summary>
        /// Holds lop calculation based on actual working days in a month
        /// </summary>
        [Description("Actual working days in a month")]
        public bool IsWorkingDaysOnly { get; set; }

        /// <summary>
        /// Holds lop calculation based on a fixed value
        /// </summary>
        [Description("Baised on Fixed value")]
        public int FixedValue { get; set; }

        /// <summary>
        /// Holds lop calculation based on formula
        /// </summary>
        [Description("Calculation based on formula")]
        public bool IsFormulaBased { get; set; }

        /// <summary>
        /// Holds lop calculation  formula
        /// </summary>
        [Description("Calculation formula")]
        public string Formula { get; set; }
    }
}
