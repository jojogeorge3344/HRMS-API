using Chef.Common.Core;
using System;

namespace Chef.HRMS.Models;

public class LeaveDetailsViewModel : ViewModel
{
    public int Id { get; set; }

    public int LeaveComponentId { get; set; }

    public int EmployeeId { get; set; }

    public DateTime FromDate { get; set; }

    public DateTime ToDate { get; set; }

    public int NumberOfDays { get; set; }

    public string Description { get; set; }

    public int LeaveStatus { get; set; }

    public string LeaveType { get; set; }

    public DateTime ApprovedDate { get; set; }

    public bool IsFullDay { get; set; }

    public bool IsFirstDayFirstHalf { get; set; }

    public bool IsFirstDaySecondHalf { get; set; }

    public bool IsSecondDayFirstHalf { get; set; }

    public bool IsSecondDaySecondHalf { get; set; }

    public int ApprovedBy { get; set; }

    public string Approver { get; set; }

    public DateTime ActualDates { get; set; }
}
