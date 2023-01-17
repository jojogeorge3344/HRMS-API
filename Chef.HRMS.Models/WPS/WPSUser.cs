using Chef.Common.Core;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class WPSUser : Model
    {
        /// <summary>
        /// Holds Wps group id
        /// </summary>
        [Required]
        [Description("Wps group id")]
        [ForeignKey("WPSGroup")]
        public int GroupId { get; set; }
        /// <summary>
        /// Holds employeeid
        /// </summary>
        [Required]
        [Description("EmployeeId")]
        [ForeignKey("Employee")]
        public int EmployeeId { get; set; }
        /// <summary>
        /// Holds wpsid
        /// </summary>
        [Required]
        [Description("WPSId")]
        //[StringLength(14)]
        public int WPSId { get; set; }
    }
}
