using Chef.Common.Core;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class PANView : Model
    {
        /// <summary>
        /// Holds the  Pan id
        /// </summary>
        [Description("id of pan")]
        public int PanId { get; set; }

        /// <summary>
        /// Holds the  document id
        /// </summary>
        [Description("id of document")]
        public int DocumentId { get; set; }

        /// <summary>
        /// Holds the  document id
        /// </summary>
        [Description("pan id of document")]
        public int PanDocumentId { get; set; }

        /// <summary>
        /// Holds date of birth
        /// </summary>
        [Description("Date of birth as in the identity document")]
        public DateTime DateOfBirth { get; set; }

        /// <summary>
        /// Holds the employee id
        /// </summary>
        [ForeignKey("Employee")]
        public int EmployeeId { get; set; }

        /// <summary>
        /// Holds the father's name as in the document
        /// </summary>
        [Description("Father's name as in the identity document")]
        public string FatherName { get; set; }

        /// <summary>
        /// Holds the approved status
        /// </summary>
        [Description("Holds the approved status")]
        public bool IsApproved { get; set; }

        /// <summary>
        /// Holds the name as in the document
        /// </summary>
        [Description("Name as in the identity document")]
        public string Name { get; set; }

        /// <summary>
        /// Holds document number
        /// </summary>
        [Description("Number of the identity document")]
        public string Number { get; set; }

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
