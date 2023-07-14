using Chef.Common.Core;
using System;
using System.ComponentModel;

namespace Chef.HRMS.Models;

public class PayrollAdhocDetails : Model
{
    public int PayrollProcessId { get; set; }
    public DateTime PayrollProcessDate { get; set; }
    public int EmployeeId { get; set; }
    public int AdhocDeductionId { get; set; }
    public bool IsAddition { get; set; }
    public decimal AdhocAmount { get; set; }
    public int ProcessStatus { get; set; }
    [ReadOnly(true)]
    [Write(false)]
    [SqlKata.Ignore]
    public int ComponentId { get; set; }
}
