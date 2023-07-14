namespace Chef.HRMS.Models;

public class OTEmployeeDetails
{
    public int Id { get; set; }
    public int OverTimePolicyId { get; set; }
    public bool IsOverTimeSlab { get; set; }
    public bool IsMonthly { get; set; }
    public string EmployeeCode { get; set; }
    public string EmployeeName { get; set; }
}
