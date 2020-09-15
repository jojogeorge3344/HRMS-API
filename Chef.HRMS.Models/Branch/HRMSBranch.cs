using Chef.Common.Core;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class HRMSBranch : Model
    {
        [Required]
        [ForeignKey("HRMSCompany")]
        public int CompanyId { get; set; }

        [Required]
        [StringLength(16)]
        public string ShortName { get; set; }

        [Required]
        [StringLength(128)]
        public string AddressLine1 { get; set; }

        [StringLength(128)]
        public string AddressLine2 { get; set; }

        [Required]
        [StringLength(32)]
        public string City { get; set; }

        public int StateOrProvince { get; set; }

        public string StateName { get; set; }

        [Required]
        public int Country { get; set; }

        [Required]
        public string CountryName { get; set; }

        [Required]
        public string Pincode { get; set; }

        [StringLength(64)]
        public string Email { get; set; }

        [StringLength(16)]
        public string Fax { get; set; }

        [StringLength(16)]
        public string Phone { get; set; }

        [Required]
        [StringLength(8)]
        public string TimeZoneId { get; set; }
    }
}