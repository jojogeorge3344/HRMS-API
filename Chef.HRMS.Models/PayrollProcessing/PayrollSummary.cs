using System.Collections.Generic;

namespace Chef.HRMS.Models.PayrollProcessing;

public class PayrollSummary
{
    public int EmployeeId { get; set; }
    public string EmployeeCode { get; set; }
    public string EmployeeName { get; set; }
    public decimal TotalEarnings { get; set; }
    public decimal TotalDeductions { get; set; }
    public decimal NetSalaryAmount { get; set; }
    public List<PayrollComponentDetails> PayrollComponentDetails { get; set; }
}
