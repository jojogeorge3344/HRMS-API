using Chef.Common.Core;
using Chef.HRMS.Types;
using System;
using System.ComponentModel;
namespace Chef.HRMS.Models
{
    public class EmployeeDocumentAttachment : Model
    {
        [Description("File extension")]
        public string Extension { get; set; }

        [Description("File name")]
        public string FileName { get; set; }

        [Description("File path")]
        public string Path { get; set; }
        public string DocumentNumber { get; set; }
        public string PlaceOfIssue { get; set; }
        public DateTime ExpiryDate { get; set; }
        public DateTime IssueDate { get; set; }
        public string Remarks { get; set; }
        public bool Active { get; set; }
        public string RefNum { get; set; }
        public int EmployeeId { get; set; }
        public int DocumentId { get; set; }
        public DocumentTypeList DocumentTypeList { get; set; }
    }
}
