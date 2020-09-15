using Chef.Common.Core;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Chef.HRMS.Models
{
    public class PayrollStructure : Model
    {
        /// <summary>
        /// Holds description of the SalaryStructure
        /// </summary>
        [Required]
        [StringLength(128)]
        [Description("Description of the salary structure")]
        public string Description { get; set; }

        /// <summary>
        /// Holds name of the SalaryStructure
        /// </summary>
        [Required]
        [StringLength(32)]
        [Description("Name of the salary structure")]
        public string Name { get; set; }

        /// <summary>
        /// Holds the details payroll structure is configured
        /// </summary>
        [Description("Payroll structure is configured")]
        public bool IsConfigured { get; set; }
    }
}