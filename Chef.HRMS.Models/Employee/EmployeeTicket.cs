using Chef.Common.Core;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models;

[Table("employeeticket")]
public class EmployeeTicket : Model
{
    [Required]
    public DateTime TravelDate { get; set; }

    [Required]
    public int TravelMode { get; set; }

    [Required]
    public string TravelFrom { get; set; }

    [Required]
    public string TravelTo { get; set; }

    [Required]
    public bool IsRoundTrip { get; set; }

    [Required]
    public decimal Amount { get; set; }

    [Required]
    public int EmployeeId { get; set; }

    [Write(false)]
    [Skip(true)]
    [SqlKata.Ignore]
    public string EmployeeCode { get; set; }

    [Write(false)]
    [Skip(true)]
    [SqlKata.Ignore]
    public string EmployeeName { get; set; }

    [Write(false)]
    [Skip(true)]
    [SqlKata.Ignore]
    public DateTime DateOfJoin { get; set; }


    [Write(false)]
    [Skip(true)]
    [SqlKata.Ignore]
    public int EligibleDays { get; set; }

    [Write(false)]
    [Skip(true)]
    [SqlKata.Ignore]
    public int EligibilityBase { get; set; }

    [Write(false)]
    [Skip(true)]
    [SqlKata.Ignore]
    public bool IncludeLOPDays { get; set; }

    [Write(false)]
    [Skip(true)]
    [SqlKata.Ignore]
    public int PayrollProcessingId { get; set; }
}