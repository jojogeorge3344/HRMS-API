using Chef.Common.Core;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class Address : Model
    {
        /// <summary>
        /// Holds the employee id
        /// </summary>
        [ForeignKey("Employee")]
        public int EmployeeId { get; set; }

        /// <summary>
        /// Holds current address line 1
        /// </summary>
        [StringLength(128)]
        public string CurrentAddressLine1 { get; set; }

        /// <summary>
        /// Holds current address line 2
        /// </summary>
        [StringLength(128)]
        public string CurrentAddressLine2 { get; set; }

        /// <summary>
        /// Holds current country
        /// </summary>
        [ForeignKey("Country")]
        public int CurrentCountry { get; set; }

        /// <summary>
        /// Holds current State
        /// </summary>
        [ForeignKey("State")]
        public int CurrentState { get; set; }

        /// <summary>
        /// Holds current pin code
        /// </summary>
        [StringLength(16)]
        public string CurrentPinCode { get; set; }

        /// <summary>
        /// Holds permanent address line1
        /// </summary>
        [StringLength(128)]
        public string PermanentAddressLine1 { get; set; }

        /// <summary>
        /// Holds permanent address line2
        /// </summary>
        [StringLength(128)]
        public string PermanentAddressLine2 { get; set; }

        /// <summary>
        /// Holds permanent country
        /// </summary>
        [ForeignKey("Country")]
        public int PermanentCountry { get; set; }

        /// <summary>
        /// Holds permanent state
        /// </summary>
        [ForeignKey("State")]
        public int PermanentState { get; set; }

        /// <summary>
        /// Holds permanent pin code
        /// </summary>
        [StringLength(16)]
        public string PermanentPinCode { get; set; }
    }
}
