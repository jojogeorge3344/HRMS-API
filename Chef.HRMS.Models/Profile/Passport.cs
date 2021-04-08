using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Chef.HRMS.Models
{
    public class Passport : IdentityDocument
    {
        /// <summary>
        /// Holds the address as in the passport
        /// </summary>
        [Required]
        [StringLength(128)]
        [Description("Address as in the passport")]
        public string Address { get; set; }



        /// <summary>
        /// Holds the date of expiry
        /// </summary>
        [Required]
        [Description("Date of expiry as in the passport")]
        public DateTime DateOfExpiry { get; set; }

        /// <summary>
        /// Holds the date of issue
        /// </summary>
        [Required]
        [Description("Date of issue of the passport")]
        public DateTime DateOfIssue { get; set; }


        /// <summary>
        /// Holds the mother's name
        /// </summary>
        [StringLength(64)]
        [Description("Mother's name as in the passport")]
        public string MotherName { get; set; }

        /// <summary>
        /// Holds the nationality of the passport holder
        /// </summary>
        [Required]
        [StringLength(64)]
        [Description("Nationality as in the passport")]
        public string Nationality { get; set; }

        /// <summary>
        /// Holds the place of birth
        /// </summary>
        [Required]
        [StringLength(32)]
        [Description("Place of birth as in the passport")]
        public string PlaceOfBirth { get; set; }

        /// <summary>
        /// Holds the place of issue
        /// </summary>
        [Required]
        [StringLength(32)]
        [Description("Place of issue as in the passport")]
        public string PlaceOfIssue { get; set; }

        /// <summary>
        /// Holds the last name
        /// </summary>
        [Required]
        [StringLength(64)]
        [Description("Surname as in the passport")]
        public string SurName { get; set; }
    }
}