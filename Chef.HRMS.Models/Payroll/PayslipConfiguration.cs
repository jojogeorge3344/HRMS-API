using Chef.Common.Core;

namespace Chef.HRMS.Models
{
    public class PayslipConfiguration : Model
    {
        /// <summary>
        /// Holds whether to include full name of the components
        /// </summary>
        public bool IncludeFullNameOfComponents { get; set; }

        /// <summary>
        /// Holds whether to include not applicable components
        /// </summary>
        public bool IncludeNotApplicableComponents { get; set; }

        /// <summary>
        /// Holds whether to include loan/advance details
        /// </summary>
        public bool IncludeLoanOrAdvanceDetails { get; set; }

        /// <summary>
        /// Holds whether to enable password protection
        /// </summary>
        public bool EnablePasswordProtection { get; set; }
    }
}
