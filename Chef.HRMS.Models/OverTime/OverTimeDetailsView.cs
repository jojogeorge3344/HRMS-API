using Chef.Common.Core;
using Chef.HRMS.Types;
using System;

namespace Chef.HRMS.Models;

public class OverTimeDetailsView : ViewModel
{
    public DateTime FromDate { get; set; }
    public DateTime ToDate { get; set; }
    public string Reason { get; set; }
    public int EmployeeId { get; set; }
    public RequestStatusType RequestStatus { get; set; }
    public int NormalOverTime { get; set; }
    public int SpecialOverTime { get; set; }
    public int HolidayOverTime { get; set; }
    public string EmployeeName { get; set; }
    public string EmployeeNumber { get; set; }
    public bool IsValid { get; set; }
    public string ErrorMessage { get; set; }
}
