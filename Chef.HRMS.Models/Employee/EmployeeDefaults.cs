using Chef.Common.Core;
using Chef.Common.Models;
using Chef.HRMS.Types;
using System.ComponentModel.DataAnnotations;

namespace Chef.HRMS.Models
{
    public class EmployeeDefaults : Model
    {
        /// <summary>
        /// Holds the probation duration type
        /// </summary>
        [Required]
        public PeriodType PeriodType { get; set; }

        /// <summary>
        /// Holds the probation duration
        /// </summary>
        [Required]
        public int ProbationDuration { get; set; }

        /// <summary>
        /// Holds the time type
        /// </summary>
        [Required]
        public TimeType TimeType { get; set; }

        /// <summary>
        /// Holds the worker type
        /// </summary>
        [Required]
        public WorkerType WorkerType { get; set; }
    }
}