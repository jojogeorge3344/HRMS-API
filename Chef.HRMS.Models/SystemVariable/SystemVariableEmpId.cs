namespace Chef.HRMS.Models;

public class SystemVariableEmpId
{
    public int Id { get; set; }
    public int OverTimePolicyId { get; set; }
    public bool IsOverTimeSlab { get; set; }
    public bool IsMonthly { get; set; }
    public int PayrollProcessId { get; set; }
}
