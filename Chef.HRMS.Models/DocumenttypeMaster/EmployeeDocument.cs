using Chef.Common.Core;
using System;

namespace Chef.HRMS.Models;

public class EmployeeDocument : Model
{
    public string DocumentNumber { get; set; }
    public string PlaceOfIssue { get; set; }
    public DateTime ExpiryDate { get; set; }
    public DateTime IssueDate { get; set; }
    public string Remarks { get; set; }
    public bool Active { get; set; }
    public string RefNum { get; set; }
    public int EmployeeId { get; set; }
    public int DocumentId { get; set; }
    public int DocumentTypeList { get; set; }
    public int DocumentTypeMasterId { get; set; }
}
