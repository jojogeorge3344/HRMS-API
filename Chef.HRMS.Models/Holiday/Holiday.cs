using Chef.Common.Core;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class Holiday : Model
    {
        /// <summary>
        /// Holds date
        /// </summary>
        [Required]
        public DateTime Date { get; set; }

        /// <summary>
        /// Holds description
        /// </summary>
        [Required]
        [StringLength(128)]
        public string Description { get; set; }

        /// <summary>
        /// Holds category id
        /// </summary>
        [Required]
        [ForeignKey("HolidayCategory")]
        public int HolidayCategoryId { get; set; }

        /// <summary>
        /// Holds is floating holiday or not
        /// </summary>
        [Required]
        public bool IsFloating { get; set; }

        /// <summary>
        /// Holds name of the holiday
        /// </summary>
        [Required]
        [StringLength(32)]
        public string Name { get; set; }
    }
}