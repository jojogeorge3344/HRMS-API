using Chef.Common.Core;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class EducationView : Model
    {
        /// <summary>
        /// Holds document id
        /// </summary>
        [Description("Document id")]
        public int DocumentId { get; set; }

        /// <summary>
        /// Holds education id
        /// </summary>
        [Description("Education id")]
        public int EducationId { get; set; }

        /// <summary>
        /// Holds education document id
        /// </summary>
        [Description("Education document id")]
        public int EducationDocumentId { get; set; }

        /// <summary>
        /// Holds degree
        /// </summary>
        [Description("Education Degree")]
        public string Degree { get; set; }

        /// <summary>
        /// Holds the employee id
        /// </summary>
        [ForeignKey("Employee")]
        public int EmployeeId { get; set; }

        /// <summary>
        /// Holds percentage
        /// </summary>
        [Description("Percentage of marks")]
        public float Percentage { get; set; }

        /// <summary>
        /// Holds specialization
        /// </summary>
        [Description("Education's specialization")]
        public string Specialization { get; set; }

        /// <summary>
        /// Holds university
        /// </summary>
        [Description("Education University")]
        public string University { get; set; }

        /// <summary>
        /// Holds year of completion
        /// </summary>
        [Description("Year of completion")]
        public DateTime YearOfCompletion { get; set; }

        /// <summary>
        /// Holds year of joining
        /// </summary>
        [Description("Year of joining")]
        public DateTime YearOfJoining { get; set; }

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
