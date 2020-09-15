using Chef.Common.Core;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class EmployeeSalaryConfiguration : Model
    {
        /// <summary>
        /// Holds effective date
        /// </summary>
        [Required]
        public DateTime EffectiveDate { get; set; }

        /// <summary>
        /// Holds reference to employee
        /// </summary>
        [ForeignKey("Employee")]
        [Required]
        public int EmployeeId { get; set; }

        /// <summary>
        /// Holds salary structure version
        /// </summary>
        public string Version { get; set; }
    }
}
