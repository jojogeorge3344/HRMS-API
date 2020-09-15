using Chef.Common.Core;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class PreviousEmploymentView : Model
    {
        /// <summary>
        /// Holds document id
        /// </summary>
        [Description("Document id")]
        public int DocumentId { get; set; }

        /// <summary>
        /// Holds previous employment id
        /// </summary>
        [Description("Previous emplyment id")]
        public int PreviousEmploymentId { get; set; }

        /// <summary>
        /// Holds previous employment document id
        /// </summary>
        [Description("Previous employment document id")]
        public int PreviousEmploymentDocumentId { get; set; }

        /// <summary>
        /// Holds company name
        /// </summary>
        [Description("Previous company name")]
        public string CompanyName { get; set; }

        /// <summary>
        /// Holds year of joining
        /// </summary>
        [Description("Date of joining")]
        public DateTime DateOfJoining { get; set; }

        /// <summary>
        /// Holds year of relieving
        /// </summary>
        [Description("Date of relieving")]
        public DateTime DateOfRelieving { get; set; }

        /// <summary>
        /// Holds the employee id
        /// </summary>
        [Description("Employee id")]
        public int EmployeeId { get; set; }

        /// <summary>
        /// Holds job title
        /// </summary>
        [Description("Job title")]
        public string JobTitle { get; set; }

        /// <summary>
        /// Holds location
        /// </summary>
        [Description("Location of the company")]
        public string Location { get; set; }

        /// <summary>
        /// Holds the approved status
        /// </summary>
        [Description("Holds the approved status")]
        public bool IsApproved { get; set; }

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
