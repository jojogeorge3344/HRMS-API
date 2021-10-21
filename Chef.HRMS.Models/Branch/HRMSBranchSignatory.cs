using Chef.Common.Core;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class HRMSBranchSignatory : Model
    {
        /// <summary>
        /// Holds the branch Id
        /// </summary>
        [Required]
        [ForeignKey("HRMSBranch")]
        public int BranchId { get; set; }

        /// <summary>
        /// Holds the full name of the signatory
        /// </summary>
        [Required]
        [StringLength(32)]
        public string FullName { get; set; }

        /// <summary>
        /// Holds the fther name of the signatory
        /// </summary>
        [Required]
        [StringLength(32)]
        public string FatherName { get; set; }

        /// <summary>
        /// Holds the designation of the signatory
        /// </summary>
        [Required]
        [StringLength(32)]
        public string Designation { get; set; }

        /// <summary>
        /// Holds the email id of the signatory
        /// </summary>
        [StringLength(64)]
        public string Email { get; set; }

        /// <summary>
        /// Holds the PAN number of the signatory
        /// </summary>
        [Required]
        [StringLength(16)]
        public string PANNumber { get; set; }

        /// <summary>
        /// Holds the phone number of the signatory
        /// </summary>
        [StringLength(16)]
        public string Phone { get; set; }

        /// <summary>
        /// Holds the fax number of the signatory
        /// </summary>
        [StringLength(16)]
        public string Fax { get; set; }

        /// <summary>
        /// Holds the address line 1 of the signatory
        /// </summary>
        [Required]
        [StringLength(128)]
        public string AddressLine1 { get; set; }

        /// <summary>
        /// Holds the address line 2 of the signatory
        /// </summary>
        [StringLength(128)]
        public string AddressLine2 { get; set; }

        /// <summary>
        /// Holds the city of the signatory
        /// </summary>
        [Required]
        [StringLength(64)]
        public string City { get; set; }

        /// <summary>
        /// Holds the state or province of the signatory
        /// </summary>
        public int StateOrProvince { get; set; }

        /// <summary>
        /// Holds the state of the signatory
        /// </summary>
        public string StateName { get; set; }

        /// <summary>
        /// Holds the country of the signatory
        /// </summary>
        [Required]
        public int Country { get; set; }

        /// <summary>
        /// Holds the country name of the signatory
        /// </summary>
        [Required]
        public string CountryName { get; set; }

        /// <summary>
        /// Holds the pin code of the signatory
        /// </summary>
        [Required]
        public string Pincode { get; set; }
    }
}