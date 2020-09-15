using Chef.Common.Core;

namespace Chef.HRMS.Models
{
    public class PayslipConfigurationFields : Model
    {
        /// <summary>
        /// Holds available field name
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Holds the status of fields
        /// </summary>
        public bool Status { get; set; }

        /// <summary>
        /// Holds the order of selected fields
        /// </summary>
        public int Orders { get; set; }
    }
}
