using System;
using System.ComponentModel;

namespace Chef.HRMS.Models
{
    public class PassportView : IdentityDocument
    {
        /// <summary>
        /// Holds the  passport id
        /// </summary>
        [Description("id of passport")]

        public int PassportId { get; set; }

        /// <summary>
        /// Holds the  document id
        /// </summary>
        [Description("id of document")]

        public int DocumentId { get; set; }


        /// <summary>
        /// Holds the  drivinglicense document id
        /// </summary>
        [Description("id of passport document")]

        public int PassportDocumentId { get; set; }
        /// <summary>
        /// Holds the address as in the passport
        /// </summary>
        [Description("Address as in the passport")]
        public string Address { get; set; }

        /// <summary>
        /// Country code as in the passport
        /// </summary>

        [Description("Country code as in the passport")]
        public string CountryCode { get; set; }

        /// <summary>
        /// Holds the date of expiry
        /// </summary>
        [Description("Date of expiry as in the passport")]
        public DateTime DateOfExpiry { get; set; }

        /// <summary>
        /// Holds the date of issue
        /// </summary>
        [Description("Date of issue of the passport")]
        public DateTime DateOfIssue { get; set; }


        /// <summary>
        /// Holds the mother's name
        /// </summary>
        [Description("Mother's name as in the passport")]
        public string MotherName { get; set; }

        /// <summary>
        /// Holds the nationality of the passport holder
        /// </summary>
        [Description("Nationality as in the passport")]
        public string Nationality { get; set; }

        /// <summary>
        /// Holds the place of birth
        /// </summary>
        [Description("Place of birth as in the passport")]
        public string PlaceOfBirth { get; set; }

        /// <summary>
        /// Holds the place of issue
        /// </summary>
        [Description("Place of issue as in the passport")]
        public string PlaceOfIssue { get; set; }

        /// <summary>
        /// Holds the last name
        /// </summary>
        [Description("Surname as in the passport")]
        public string SurName { get; set; }

        /// <summary>
        /// Holds the extension of the file .pdf, .docx
        /// </summary>
        [Description("File extension")]
        public string Extension { get; set; }

        /// <summary>
        /// Holds the name of the file
        /// </summary>
        [Description("File name")]
        public string FileName { get; set; }

        /// <summary>
        /// Holds the full file path
        /// </summary>
        [Description("File path")]
        public string Path { get; set; }
    }
}
