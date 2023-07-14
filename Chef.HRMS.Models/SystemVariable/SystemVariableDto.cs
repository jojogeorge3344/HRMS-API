using Chef.Common.Core;
using System;

namespace Chef.HRMS.Models;

public class SystemVariableDto : Model
{
    public int SystemVariableId { get; set; }
    public int EmployeeId { get; set; }
    public DateTime TransDate { get; set; }

    public Decimal TransValue { get; set; }

    public int Status { get; set; }

    public int PayrollProcessId { get; set; }
}

public class SystemVariableOTDto : Model
{
    public int Nml_SystemVariableId { get; set; }
    public int Sp_OtSystemVariableId { get; set; }
    public int Hd_OtSystemVariableId { get; set; }
    public Decimal NormalOverTime { get; set; }
    public Decimal HolidayOverTime { get; set; }
    public Decimal SpecialOverTime { get; set; }
}
