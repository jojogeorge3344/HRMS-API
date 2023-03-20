using Chef.Common.Core;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Chef.HRMS.Models
{
    public class WPSGroup : Model
    {
        /// <summary>
        /// Holds Wps group code
        /// </summary>
        [Required]
        [Description("Wps group code")]
        [StringLength(14)]
        public string GroupCode { get; set; }
        /// <summary>
        /// Holds Wps group name
        /// </summary>
        [Required]
        [Description("Wps group name")]
        [StringLength(64)]
        public string GroupName { get; set; }
        /// <summary>
        /// Holds Wps establishment id
        /// </summary>
        [Required]
        [Description("Wps establishment id")]
        [StringLength(13)]
        public string EstablishmentId { get; set; }
        /// <summary>
        /// Holds Wps remarks
        /// </summary>
        [Required]
        [Description("remarks")]
        [StringLength(120)]
        public string Remarks { get; set; }

        [Required]
        [Description("molid")]
        [StringLength(100)]
        public string MolId { get; set; }

        [Required]
        [Description("routingid")]
        [StringLength(100)]
        public string RoutingId { get; set; }

        [Required]
        [Description("salarycardno")]
        [StringLength(100)]
        public string SalaryCardNo { get; set; }

        [Required]
        [Description("bankname")]
        [StringLength(200)]
        public string BankName { get; set; }

        [Required]
        [Description("accountno")]
        [StringLength(100)]
        public string AccountNo { get; set; }


    }
}
