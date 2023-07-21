using Chef.Common.Core;
using System;

namespace Chef.HRMS.Models;

public class SystemVariableValues : Model
{
    [Write(false)]
    [Skip(true)]
    [SqlKata.Ignore]
    public string Code { get; set; }
    public int SystemVariableId { get; set; }
    public int EmployeeId { get; set; }
    public DateTime TransDate { get; set; }
    public Decimal TransValue { get; set; }
    public int Status { get; set; }
    public int PayrollProcessId { get; set; }
}
