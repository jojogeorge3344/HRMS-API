using Chef.Common.Core;
using Chef.HRMS.Types;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class OverTimePolicy:Model
    {
        /// <summary>
        /// Holds name of the overtime policy
        /// </summary>
        [Required]
        [StringLength(32)]
        [Description("Name of the overtime policy")]
        public string Name { get; set; }

        /// <summary>
        /// Holds description of the overtime policy
        /// </summary>
        [Required]
        [StringLength(128)]
        [Description("Description of the overtime policy")]
        public string Description { get; set; }

        /// <summary>
        /// Holds the details of assigned employee count
        /// </summary>
        [ForeignKey("Employee")]
        [Description("Who all will belongs to this policy")]
        public int NumberOfEmployees { get; set; }

        /// <summary>
        /// Holds the details overtime calculation based of effective hour or gross hour
        /// </summary>
        [Description("Overtime calculation based of effective hour or gross hour")]
        public AttendanceHoursType AttendanceHoursType { get; set; }

        /// <summary>
        /// Holds the details overtime is configured
        /// </summary>
        [Description("Overtime is configured")]
        public bool IsConfigured { get; set; }
    }
}
