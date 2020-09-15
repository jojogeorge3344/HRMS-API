using Chef.Common.Core;
using System.ComponentModel.DataAnnotations;

namespace Chef.HRMS.Models
{
    public class HRMSTenant : Model
    {
        /// <summary>
        /// Holds the connection string
        /// </summary>
        [Required]
        [StringLength(128)]
        public string ConnectionString { get; set; }

        /// <summary>
        /// Holds the name
        /// </summary>
        [Required]
        [StringLength(16)]
        public string Name { get; set; }
    }
}