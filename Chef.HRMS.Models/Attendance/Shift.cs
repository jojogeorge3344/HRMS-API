using Chef.Common.Core;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Chef.HRMS.Models
{
    public class Shift : Model
    {
        /// <summary>
        /// Holds shift schedule name
        /// </summary>
        [Required]
        [StringLength(26)]
        [Description("Shift schedule name")]
        public string Name { get; set; }

        /// <summary>
        /// Holds shift start time
        /// </summary>
        [Required]
        [Description("Shift start time")]
        public DateTime StartTime { get; set; }

        /// <summary>
        /// Holds shift end time
        /// </summary>
        [Required]
        [Description("Shift end time")]
        public DateTime EndTime { get; set; }

        /// <summary>
        /// Holds break duration
        /// </summary>
        [Required]
        [Description("Break Duration")]
        public int BreakDuration { get; set; }

        /// <summary>
        /// Holds number of days
        /// </summary>
        [Required]
        [Description("Number of Days")]
        public int NumberOfDays { get; set; }

        /// <summary>
        /// Holds comments
        /// </summary>
        [Description("Comments")]
        public string Comments { get; set; }
    }
}
